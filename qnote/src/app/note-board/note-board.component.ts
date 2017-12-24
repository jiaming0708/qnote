import { EntryService } from './../share/entry.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Note } from '../share/note';
import { NoteService } from '../share/note.service';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map, concatMap } from 'rxjs/operators';

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
  token: string;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private entryService:EntryService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(param => {
        this.token = param.get('token');
        return this.token;
      }),
      mergeMap(token => this.entryService.getName(token), (token, name) => {
        return ({ token, name });
      }),
      mergeMap(({ token, name }) => this.noteService.getAll(token), ({ token, name }, notes) => {
        return { name, notes };
      })
    ).subscribe(({ name, notes }) => {
      this.noteName = name;
      this.noteList = notes;
    })

    this.noteColors = ['red', 'yellow', 'blue', 'green'];
  }

  createNote(color: string) {
    const note = {
      Id: -1,
      NoteColor: color,
      NotePositionX: 0,
      NotePositionY: 0
    } as Note;

    this.noteService.create(note, this.token)
      .pipe(
      concatMap(val => {
        console.log(val);
        return this.noteService.getAll(this.token);
      })
      ).subscribe(result => {
        this.noteList = result;
      });
  }

  dragNoteEnd(event: DragEvent, note: Note) {
    const parent = event.toElement.parentElement.getBoundingClientRect();
    note.NotePositionX = event.clientX - parent.left;
    // 因為primeng的clientY是加上clientHight，所以要先減掉，之後如果有修正在拉掉!!
    note.NotePositionY = event.clientY - event.toElement.clientHeight - parent.top;

    this.noteService.put(note, this.token)
      .subscribe();
  }

  changeNoteContent(event: string, note: Note) {
    note.Notecontent = event;
    this.noteService.put(note, this.token)
      .subscribe();
  }
}
