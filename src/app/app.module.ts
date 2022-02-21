import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonsModule } from './pokemons/pokemons.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    PokemonsModule,
    NgbModule,
    
  ],
  providers: [
    NgbActiveModal,
    NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
