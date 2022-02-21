import { Component, OnInit } from '@angular/core';
import { PokemonsService } from 'src/app/core/services/pokemons.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { IPokemon } from '../../core/interfaces/pokemon';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.scss'],
  animations: [
    trigger("initState", [
      state('void', style({ transform: 'translateX(100%)', opacity: 0})),
      transition(':enter', [
        animate(400, style({transform: 'translateX(0)', opacity: 1}))
      ])
    ]),
    trigger("changeViewState", [
      state('void', style({ transform: 'translateX(100%)', opacity: 0})),
      transition(':enter', [
        animate(800, style({transform: 'translateX(0)', opacity: 1}))
      ]),
      transition(':leave', [
        animate(400, style({transform: 'translateX(-200%)', opacity: 0}))
      ])
    ])
  ]
})
export class PokemonPageComponent implements OnInit {
  view: string = "grid";
  showDialog: boolean = false;
  pokemonSelected!: IPokemon;
  constructor(private pokemonService: PokemonsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonsList()
  }

  handleClickCard(pk: IPokemon){
    this.showDialog = !this.showDialog
    this.pokemonSelected = pk
  }

  changeView(view: string) {
    this.view = view
  }

  get getPokemonsList(): any[] {
    return this.pokemonService.getPokemons;
  }

  getImages(sprites: any[]){
    return Object.keys(sprites).map((v: any) => typeof sprites[v] === 'string' && sprites[v] !== null && sprites[v]).filter(i => i)
  }
}
