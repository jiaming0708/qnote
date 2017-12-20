import { EntryService } from './entry.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { EntryComponent } from './entry.component';
import { FormsModule } from '@angular/forms';
import { EntryRoutingModule } from './entry-routing.module';
import { Router } from '@angular/router';
import { routes } from './entry-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from 'selenium-webdriver';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;
  let entryService: EntryService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        EntryRoutingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [EntryComponent],
      providers: [EntryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryComponent);

    component = fixture.componentInstance;
    entryService = fixture.debugElement.injector.get(EntryService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to QNote!');
  });

  it('should input name on input', () => {
    const compiled = fixture.debugElement.nativeElement;
    const noteName = compiled.query(By.name('noteName'));
    // console.log(noteName);

    // component.noteName = 'jimmy';
    // component.submit();

  });
});
