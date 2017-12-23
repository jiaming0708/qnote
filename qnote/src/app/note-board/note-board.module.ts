import { NoteService } from './../share/note.service';
import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteBoardRoutingModule } from './note-board-routing.module';
import { NoteBoardComponent } from './note-board.component';

import { DragDropModule } from 'primeng/primeng';
import { NoteBlockDirective } from '../share/note-block.directive';

@NgModule({
  imports: [
    ShareModule,
    NoteBoardRoutingModule,
    DragDropModule
  ],
  declarations: [
    NoteBlockDirective,
    NoteBoardComponent
  ],
  providers: [
    NoteService
  ]
})
export class NoteBoardModule { }
