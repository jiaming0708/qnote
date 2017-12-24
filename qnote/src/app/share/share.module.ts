import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteBlockDirective } from './note-block.directive';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
  ],
  providers: [
    { provide: 'apiUrl', useValue: environment.url }
  ]
})
export class ShareModule { }
