import { EntryService } from './entry.service';
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { EntryComponent } from './entry.component';
import { FormsModule } from '@angular/forms';
import { EntryRoutingModule } from './entry-routing.module';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { routes } from '../fake/fake-routing.module';
import { FakeComponent } from '../fake/fake.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;
  let entryService: EntryService;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [    
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule
      ],
      declarations: [EntryComponent, FakeComponent],
      providers: [
        EntryService,
        { provide: 'apiUrl', useValue: environment.url }
      ]
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

  it('should redirect to login', fakeAsync(() => {
    const url = 'test';
    spyOn(entryService, 'login').and.returnValue(of(url));
    component.submit();
    tick();
    expect(router.routerState.snapshot.url).toBe(`/${url}/note`);
  }))
});
