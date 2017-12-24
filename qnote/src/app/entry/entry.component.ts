import { Component, OnInit } from '@angular/core';
import { EntryService } from '../share/entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent {
  noteName: string;

  constructor(private entryService: EntryService, private router:Router) { }

  submit() {
    this.entryService.login(this.noteName)
      .subscribe(result => {
        this.router.navigate([`/${result}/note`]);
      });
  }
}
