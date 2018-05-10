import { AppComponent } from './app.component';
import { GitHubCvComponent } from './githubcv/githubcv.component';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '**', component: GitHubCvComponent },
];
