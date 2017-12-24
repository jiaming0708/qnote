import { Directive, EventEmitter, Input, HostBinding, HostListener, Output, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Note } from './note';

@Directive({
  selector: '[appNoteBlock]'
})
export class NoteBlockDirective implements AfterViewInit {
  @Input('data') note: Note;
  @Output() onBlurNote = new EventEmitter;
  @ViewChild('div', {read: ElementRef}) content;

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

  ngAfterViewInit() {
    console.log(this.content);
  }

  constructor(private el:ElementRef) { }

}
