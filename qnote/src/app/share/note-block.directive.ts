import { Directive, OnChanges } from '@angular/core';
import { Input, HostBinding } from '@angular/core';
import { Note } from './note';

@Directive({
  selector: '[appNoteBlock]'
})
export class NoteBlockDirective {
  @Input('data') note: Note;
  @HostBinding('style.backgroundColor') get color() {
    return this.note.Color;
  }
  @HostBinding('style.left.px') get x() {
    return this.note.PositionX;
  }
  @HostBinding('style.top.px') get y() {
    return this.note.PositionY;
  }

  constructor() { }

}
