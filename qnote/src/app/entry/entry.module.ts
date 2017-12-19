import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { EntryRoutingModule } from './entry-routing.module';
import { EntryComponent } from './entry.component';
import { EntryService } from './entry.service';

@NgModule({
  imports: [
    CommonModule,
    EntryRoutingModule,
    FormsModule
  ],
  declarations: [EntryComponent],
  providers:[EntryService]
})
export class EntryModule { }
