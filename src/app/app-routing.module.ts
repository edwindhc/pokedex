import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonPageComponent } from './pokemons/pokemon-page/pokemon-page.component';
import { DetailComponent } from './pokemons/detail/detail.component';
import { PokemonGuard } from './core/guards/pokemon.guard';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';

DetailComponent
const routes: Routes = [
  { path: "", component: PokemonPageComponent},
  { path: 'pokemon/:name', component: DetailComponent, canActivate: [PokemonGuard] },
  { path: "unauthorized", component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
