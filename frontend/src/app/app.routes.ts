import { Routes } from '@angular/router';
import { ResultsComponent } from './results.component';

export const routes: Routes = [
  { path: '', component: ResultsComponent },
  { path: '**', redirectTo: '' }
];
