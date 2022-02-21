import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonsService } from 'src/app/core/services/pokemons.service';
import Swal from 'sweetalert2';
import { IPokemon } from '../../core/interfaces/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  subscriptions: Subscription[] = [];
  pokemon!: IPokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonsService,
    private router: Router
  ) { }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.pokemonService.fetchPokemonByName(params["name"]).subscribe({
        next: response => {
            this.pokemonService.getSpecie(params["name"]).subscribe((specie: any) => {
                let pokemonData = { ...response, ...{ evolution_chain: specie.evolution_chain } }
                this.pokemonService.getEvolution(pokemonData.evolution_chain.url).subscribe(res => {
                    const evolutionFrom = this.pokemonService.getEvolutionBefore(res.chain, pokemonData.name || "")
                    const evolutionChain = this.pokemonService.getEvolutionChain(res.chain)
                    pokemonData = { ...pokemonData, ...{ evolutionFrom, evolutionChain } }
                    return this.pokemon = pokemonData;
                })
            });
        },
        error: () => {

          Swal.fire({ title: `El pokemon ${name} no fue encontrado`, timer: 2500, icon: "error" })
          this.router.navigate(['/']);
        }
    });
  })
}

getImageByUrl(url: string = ""): string {
  const getId = url.split('/')
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getId[getId.length - 2]}.png`;
}


}
