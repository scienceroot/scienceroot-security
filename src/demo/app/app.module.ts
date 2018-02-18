import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ScrAuthenticationLoginComponent, ScrAuthenticationModule, ScrAuthenticationTokenStoreConfig} from "security";
import {ScrRestrictedDemoModule} from "./restricted/restricted.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: 'restricted'},
      {path: 'login', component: ScrAuthenticationLoginComponent}
    ]),
    ScrAuthenticationModule,
    ScrRestrictedDemoModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


  constructor() {
    new ScrAuthenticationTokenStoreConfig('scrAuthToken').save();
  }


}

