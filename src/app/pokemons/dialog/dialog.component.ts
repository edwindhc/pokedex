import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { IPokemon } from '../../core/interfaces/pokemon';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('myModal', [
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)', opacity: 1 }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() pokemonSelected! : IPokemon;
  
  constructor(public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  getImageByUrl(url: string = ""): string {
    const getId = url.split('/')
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getId[getId.length - 2]}.png`;
  }

  


}
