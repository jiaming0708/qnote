import { TestBed, inject } from '@angular/core/testing';

import { EntryService } from './entry.service';

describe('EntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryService]
    });
  });

  it('should be created', inject([EntryService], (service: EntryService) => {
    expect(service).toBeTruthy();
  }));

  it('input jimmy be the name and get token', inject([EntryService], (service: EntryService) => {
    service.login('jimmy').subscribe(result => {
      expect(result).toEqual('jimmy');
    });
  }));
});
