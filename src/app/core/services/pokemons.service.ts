import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { concat, Observable, zip } from 'rxjs';
import Swal from 'sweetalert2';
import { IPokemon } from '../interfaces/pokemon';

@Injectable({
    providedIn: 'root'
})
export class PokemonsService {
    private pokemons: any[] = []


    constructor(private http: HttpClient) { }

    get getPokemons(): any[] {
        return [...this.pokemons];
    }

    setPokemons(p: any[]) {
        this.pokemons.push(p)
    }

    listPokemon(limit: number = 25): Observable<any> {
        return this.http.get(`${environment.BASE_URL}pokemon?limit=${limit}`);
    }
    getSpecie(name: string): Observable<any> {
        return this.http.get<any>(`${environment.BASE_URL}pokemon-species/${name}`);
    }
    getEvolution(url: string): Observable<any> {
        return this.http.get<any>(url);
    }
    fetchPokemonByName(name: string): Observable<IPokemon> {
        return this.http.get<IPokemon>(`${environment.BASE_URL}pokemon/${name}`);
    }

    getPokemonsList(limit: number = 25) {
        this.pokemons = []
        this.listPokemon(limit).subscribe({
            next: (response) => {
                const detailAndSpecie = response.results.map((r: IPokemon) => zip(this.getSpecie(r.name || ""), this.fetchPokemonByName(r.name||"")))
                concat(...detailAndSpecie).subscribe((response: any) => {
                    let pokemonData = response.reduce((acc: IPokemon, pk: any) => ({ ...pk, ...{ evolution_chain: acc.evolution_chain } }))
                    this.getEvolution(pokemonData.evolution_chain.url).subscribe(res => {
                        const evolutionFrom = this.getEvolutionBefore(res.chain, pokemonData.name)
                        const evolutionChain = this.getEvolutionChain(res.chain)
                        pokemonData = { ...pokemonData, ...{ evolutionFrom, evolutionChain } }
                         this.setPokemons(pokemonData);

                    })
                });
            },
            error: () => Swal.fire({ title: `Ha ocurrido un error en la lista de pokemon`, timer: 2500, icon: "error" })
        });
    }

    getPokemonByName(name: string) {
        this.fetchPokemonByName(name).subscribe({
            next: response => {
                this.getSpecie(name).subscribe((specie: any) => {
                    let pokemonData = { ...response, ...{ evolution_chain: specie.evolution_chain } }
                    this.getEvolution(pokemonData.evolution_chain.url).subscribe(res => {
                        const evolutionFrom = this.getEvolutionBefore(res.chain, pokemonData.name || "")
                        const evolutionChain = this.getEvolutionChain(res.chain)
                        pokemonData = { ...pokemonData, ...{ evolutionFrom, evolutionChain } }
                        return this.pokemons = [pokemonData];
                    })
                });
            },
            error: () => Swal.fire({ title: `El pokemon ${name} no fue encontrado`, timer: 2500, icon: "error" })
        });
    }

    getEvolutionBefore(chain: any, name: string, previus: string = name): any {
        if (chain.species.name === name) return previus
        return this.getEvolutionBefore(chain.evolves_to[0], name, chain.species.name);
    }

    getEvolutionChain(chain: any, list: any = []): any {
        if(chain.species.name && chain.evolves_to[0]) return this.getEvolutionChain(chain.evolves_to[0], [...list, ...[chain.species]])
        return [...list, ...[chain.species]];
    }
}
