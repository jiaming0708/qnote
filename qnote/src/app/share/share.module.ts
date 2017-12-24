import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteBlockDirective } from './note-block.directive';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    { provide: 'apiUrl', useValue: environment.url }
  ]
})
export class ShareModule { }
