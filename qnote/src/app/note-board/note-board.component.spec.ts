import { Observable } from 'rxjs/Observable';
import { EntryService } from './../share/entry.service';
import { environment } from './../../environments/environment.prod';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NoteBoardComponent } from './note-board.component';
import { ActivatedRoute, RouterModule, convertToParamMap, ParamMap } from '@angular/router'
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Note } from '../share/note';
import { NoteService } from '../share/note.service';
import { NoteBlockDirective } from '../share/note-block.directive';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap is Observable
  private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subject.asObservable();

  // Test parameters
  private _testParamMap: ParamMap;
  get testParamMap() { return this._testParamMap; }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  // ActivatedRoute.snapshot.paramMap
  get snapshot() {
    return { paramMap: this.testParamMap };
  }
}

describe('NoteBoardComponent', () => {
  let component: NoteBoardComponent;
  let fixture: ComponentFixture<NoteBoardComponent>;
  let route: ActivatedRouteStub;
  let noteService: NoteService;
  let entryService: EntryService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteBoardComponent,
        NoteBlockDirective
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        NoteService,
        EntryService,
        { provide: 'apiUrl', useValue: environment.url }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteBoardComponent);
    component = fixture.componentInstance;
    noteService = fixture.debugElement.injector.get(NoteService);
    entryService = fixture.debugElement.injector.get(EntryService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have route params', fakeAsync(() => {
    const token = '123';
    const name = '456';
    spyOn(noteService, 'getAll').and.returnValue(of([]));
    spyOn(entryService, 'getName').and.returnValue(of(name));
    route.testParamMap = { token: token };
    component.ngOnInit();
    tick();
    expect(component.noteName).toBe(name);
  }));

  it('should create a note', async(() => {
    const color = 'red';
    const expectNote = {
      NoteColor: color,
      NotePositionX: 0,
      NotePositionY: 0
    } as Note;
    spyOn(noteService, 'create').and.returnValue(of([]));
    spyOn(noteService, 'getAll').and.returnValue(of([expectNote]));
    component.createNote(color);
    expect(component.noteList.length).toBe(1);
    expect(component.noteList[0]).toEqual(expectNote);
  }));
  
  it('should drag a note', () => {
    const note = {
      NoteColor: 'red',
      NotePositionX: 50,
      NotePositionY: 50
    } as Note;
    const changeSubject = { noteX: 100, noteY: 100, noteHeight: 150 };
    const parentX = 8, parentY = 68;
    const expectX = changeSubject.noteX - parentX;
    const expectY = changeSubject.noteY - changeSubject.noteHeight - parentY;

    const event = new DragEvent('dragend');
    event.initMouseEvent('dragend', false, false, undefined, 0, changeSubject.noteX, changeSubject.noteY, changeSubject.noteX, changeSubject.noteY, false, false, false, false, 0, undefined);
    spyOnProperty(event, 'toElement', 'get').and.returnValue({
      clientHeight: changeSubject.noteHeight,
      parentElement: {
        getBoundingClientRect: () => {
          return {
            left: parentX,
            top: parentY
          }
        }
      }
    });
    component.dragNoteEnd(event, note);

    expect(note.NotePositionX).toEqual(expectX);
    expect(note.NotePositionY).toEqual(expectY);
  });
});
