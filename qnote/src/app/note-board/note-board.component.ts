import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Note } from '../share/note';
import { NoteService } from '../share/note.service';

@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrls: ['./note-board.component.scss']
})
export class NoteBoardComponent implements OnInit {
  noteName: string;
  noteColors: string[];
  noteList: Note[];
  dragStartX: number;
  dragStartY: number;

  constructor(private route: ActivatedRoute, private noteService: NoteService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.noteName = param.get('token');
    });

    this.noteColors = ['red', 'yellow', 'blue', 'green'];
    this.noteList = [];
  }

  createNote(color: string) {
    const note = {
      Color: color,
      PositionX: 0,
      PositionY: 0
    } as Note;

    this.noteService.create(note, this.noteName)
      .subscribe();
    
    this.noteService.getAll(this.noteName)
      .subscribe(result => this.noteList = result);
  }

  dragNoteEnd(event: DragEvent, note: Note) {
    const parent = event.toElement.parentElement.getBoundingClientRect();
    note.PositionX = event.clientX - parent.left;
    // 因為primeng的clientY是加上clientHight，所以要先減掉，之後如果有修正在拉掉!!
    note.PositionY = event.clientY - event.toElement.clientHeight - parent.top;
  }
}
