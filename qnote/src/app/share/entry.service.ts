import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class EntryService {

  constructor(private http:HttpClient, @Inject('apiUrl') private apiUrl) { }

  login(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/main`, {
      NoteName: name,
      NoteKey: ''
    });
    // return Observable.create(obs => {
    //   obs.next(name);
    //   obs.complete();
    // });
  }

  getName(token: string): Observable<string>{
    return this.http.get(`${this.apiUrl}/main?key=${token}`)
      .pipe(
      map(result => result['NoteName'])
      );
  }
}
