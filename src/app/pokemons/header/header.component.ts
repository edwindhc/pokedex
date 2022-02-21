import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonsService } from 'src/app/core/services/pokemons.service';
import { concat, Observable, zip } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('textSearch') textSearch!: ElementRef<HTMLInputElement>;

  constructor(private pokemonService: PokemonsService) { }

  ngOnInit(): void {}

  search(){
    this.textSearch.nativeElement.blur()
    return this.pokemonService.getPokemonByName(this.textSearch.nativeElement.value)
  }

  clearSearch(){
    if(!this.textSearch.nativeElement.value) return;
    this.textSearch.nativeElement.value = ""
    return this.pokemonService.getPokemonsList()
  }
}
