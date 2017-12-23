import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteBlockDirective } from './note-block.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
  ]
})
export class ShareModule { }
