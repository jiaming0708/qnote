import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { EntryService } from './entry.service';
import { environment } from '../../environments/environment';
import { Inject } from '@angular/core';

describe('EntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [EntryService,
        { provide: 'apiUrl', useValue: environment.url }
      ]
    });
  });

  it('should be created', inject([EntryService, 'apiUrl'], (service: EntryService, apiUrl:string) => {
    expect(service).toBeTruthy();
  }));

  it('input jimmy be the name and get token', inject([EntryService], (service: EntryService) => {
    service.login('jimmy').subscribe(result => {
      expect(result).toEqual('jimmy');
    });
  }));

  it('should get note name by key', inject([EntryService], (service: EntryService) => {
    const token = 'jimmy';
    const name = 'jimmy';
    service.getName(token)
      .subscribe(result => expect(result).toEqual(name));
  }));
});
