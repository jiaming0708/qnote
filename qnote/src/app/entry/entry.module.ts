import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { EntryRoutingModule } from './entry-routing.module';
import { EntryComponent } from './entry.component';
import { EntryService } from '../share/entry.service';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    ShareModule,
    EntryRoutingModule
  ],
  declarations: [EntryComponent],
  providers:[EntryService]
})
export class EntryModule { }
