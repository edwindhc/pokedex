import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonPageComponent } from './pokemon-page/pokemon-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { DialogComponent } from './dialog/dialog.component';
import { DetailComponent } from './detail/detail.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    PokemonPageComponent,
    HeaderComponent,
    DialogComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    PokemonPageComponent
  ]
})
export class PokemonsModule { }
