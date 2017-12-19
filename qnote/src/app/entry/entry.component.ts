import { Component, OnInit } from '@angular/core';
import { EntryService } from './entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  noteName: string;

  constructor(private entryService: EntryService, private router:Router) { }

  ngOnInit() {
  }

  submit() {
    this.entryService.login(this.noteName)
      .subscribe(result => {
        console.log(result);
        this.router.navigate([`/${result}/note`]);
      });
  }
}
