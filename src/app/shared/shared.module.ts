import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
  ]
})
export class SharedModule { }
