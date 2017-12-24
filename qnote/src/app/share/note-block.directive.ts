import { Directive, OnChanges } from '@angular/core';
import { Input, HostBinding, HostListener } from '@angular/core';
import { Note } from './note';

@Directive({
  selector: '[appNoteBlock]'
})
export class NoteBlockDirective {
  @Input('data') note: Note;
  @HostBinding('style.backgroundColor') get color() {
    return this.note.NoteColor;
  }
  @HostBinding('style.left.px') get x() {
    return this.note.NotePositionX;
  }
  @HostBinding('style.top.px') get y() {
    return this.note.NotePositionY;
  }
  @HostBinding('attr.contenteditable') editable: boolean;
  @HostListener('dblclick') dbClick() {
    this.editable = true;
  }
  @HostListener('blur') blur() {
    this.editable = false;
  }

  constructor() { }

}
