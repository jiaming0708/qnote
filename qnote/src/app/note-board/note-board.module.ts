import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteBoardRoutingModule } from './note-board-routing.module';
import { NoteBoardComponent } from './note-board.component';

@NgModule({
  imports: [
    CommonModule,
    NoteBoardRoutingModule
  ],
  declarations: [NoteBoardComponent]
})
export class NoteBoardModule { }
