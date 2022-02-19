import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.scss']
})
export class PokemonPageComponent implements OnInit {

  view: string = "grid";

  constructor() { }

  ngOnInit(): void {
  }

  changeView(view: string){
    this.view = view
  }

}
