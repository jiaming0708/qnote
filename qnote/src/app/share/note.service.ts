import { Observable } from 'rxjs/Observable';
import { Note } from './note';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NoteService {
  noteList: Note[];

  constructor() {
    this.noteList = [];
   }

  create(note: Note, token: string): Observable<any> {
    return Observable.create(obs => {
      this.noteList.push(note);
      obs.next('');
      obs.complete();
    });
  }

  getAll(token: string):Observable<Note[]> {
    return of(this.noteList);
  }
}
