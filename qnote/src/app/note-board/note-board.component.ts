import { Note } from './../share/note';
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
      Color: color
    } as Note;

    this.noteService.create(note, this.noteName)
      .subscribe();
    
    this.noteService.getAll(this.noteName)
      .subscribe(result => this.noteList = result);
  }

}
