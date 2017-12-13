import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: 'app/entry/entry.module#EntryModule' },
  { path: ':token/kanban', loadChildren: 'app/kanban-board/kanban-board.module#KanbanBoardModule' },
  { path: ':token/note', loadChildren: 'app/note-board/note-board.module#NoteBoardModule' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
