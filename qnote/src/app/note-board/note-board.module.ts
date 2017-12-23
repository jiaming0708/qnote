import { NoteService } from './../share/note.service';
import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteBoardRoutingModule } from './note-board-routing.module';
import { NoteBoardComponent } from './note-board.component';

import { DragDropModule } from 'primeng/primeng';

@NgModule({
  imports: [
    ShareModule,
    NoteBoardRoutingModule,
    DragDropModule
  ],
  declarations: [NoteBoardComponent],
  providers: [
    NoteService
  ]
})
export class NoteBoardModule { }
