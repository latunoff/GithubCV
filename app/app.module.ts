import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routing.module';

import { AppComponent } from './app.component';
import { GitHubCvComponent } from './githubcv/githubcv.component';
import { OutputCvComponent } from './githubcv/output.component';
import { FirstTplComponent } from './githubcv/tpls/first.component';
import { SecondTplComponent } from './githubcv/tpls/second.component';

@NgModule({
  declarations: [
    AppComponent,
    GitHubCvComponent,
    OutputCvComponent,
    FirstTplComponent,
    SecondTplComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent,
    GitHubCvComponent]
})
export class AppModule { }
