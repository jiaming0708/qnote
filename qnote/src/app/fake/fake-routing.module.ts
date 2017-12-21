import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FakeComponent } from './fake.component';

export const routes: Routes = [
  { path: '**', component: FakeComponent }
];
