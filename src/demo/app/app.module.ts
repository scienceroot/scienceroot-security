import { NgModule }      from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { RouterModule }      from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
    ])
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {


  constructor() {
  }


}

