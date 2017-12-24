import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EntryService {

  constructor(private http:HttpClient, @Inject('apiUrl') private apiUrl) { }

  login(name: string): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    return this.http.post(`${this.apiUrl}/main`, {
      NoteName: name,
      NoteKey: ''
    }, { headers });
    // return Observable.create(obs => {
    //   obs.next(name);
    //   obs.complete();
    // });
  }
}
