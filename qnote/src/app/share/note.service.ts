import { Observable } from 'rxjs/Observable';
import { Note } from './note';
import { Injectable, Inject } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NoteService {
  noteList: Note[];

  constructor(private http: HttpClient, @Inject('apiUrl') private apiUrl: string) {
    this.noteList = [];
  }

  create(note: Note, token: string): Observable<any> {
    return Observable.create(obs => {
      this.noteList.push(note);
      obs.next('');
      obs.complete();
    });
  }

  getAll(token: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/notes?key=${token}`);
    // return of(this.noteList);
  }
}
