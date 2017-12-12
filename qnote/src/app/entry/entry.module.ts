import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryComponent } from './entry.component';

@NgModule({
  imports: [
    CommonModule,
    EntryRoutingModule
  ],
  declarations: [EntryComponent]
})
export class EntryModule { }
