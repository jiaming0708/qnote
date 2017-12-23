import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NoteBoardComponent } from './note-board.component';
import { ActivatedRoute, RouterModule, convertToParamMap, ParamMap } from '@angular/router'
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Note } from '../share/note';
import { NoteService } from '../share/note.service';
import { NoteBlockDirective } from '../share/note-block.directive';
import { SharedModule } from 'primeng/primeng';

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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteBoardComponent,
        NoteBlockDirective
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        NoteService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteBoardComponent);
    component = fixture.componentInstance;   
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have route params', fakeAsync(() => {
    route.testParamMap = { token: '123' };
    component.ngOnInit();
    tick();
    expect(component.noteName).toBe('123');
  }));

  it('should create a note', () => {
    const color = 'red';
    component.createNote(color);
    expect(component.noteList.length).toBe(1);
    expect(component.noteList[0]).toEqual({ Color: color });
  });

  it('should drag a note', () => {
    const note = {
      Color: 'red',
      PositionX: 50,
      PositionY: 50
    } as Note;

    const event = new DragEvent('drag');
    event.initMouseEvent('drag', false, false, undefined, 0, 100, 100, 100, 100, false, false, false, false, 0, undefined);

    component.dragNote(note, event);

    expect(note.PositionX).toEqual(event.clientX);
    expect(note.PositionY).toEqual(event.clientY);
  });
});
