import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EntryService {

  constructor() { }

  login(name: string):Observable<string> {
    return Observable.create(obs => {
      obs.next(name);
      obs.complete();
    });
  }
}
