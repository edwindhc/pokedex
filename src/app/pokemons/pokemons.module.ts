import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonPageComponent } from './pokemon-page/pokemon-page.component';



@NgModule({
  declarations: [
    PokemonPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PokemonPageComponent
  ]
})
export class PokemonsModule { }
