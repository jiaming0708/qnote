import { Directive, EventEmitter, Input, HostBinding, HostListener, Output, ElementRef } from '@angular/core';
import { Note } from './note';

@Directive({
  selector: '[appNoteBlock]'
})
export class NoteBlockDirective {
  @Input('data') note: Note;
  @Output() onBlurNote = new EventEmitter;
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
    this.onBlurNote.emit(this.el.nativeElement.innerHTML);
  }

  constructor(private el:ElementRef) { }

}
