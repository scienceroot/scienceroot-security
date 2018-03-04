import { Component } from '@angular/core';
import {ScrAuthenticationLoginService, ScrAuthenticationStore, ScrAuthenticationStoreConfig} from "security";

@Component({
  selector: 'demo-app',
  template: `
    <div>
      <h1>@scienceroot/security</h1>
      <ul>
        <li>
          <a [routerLink]="['restricted']">Restricted Area</a>
        </li>
      </ul>

    </div>

    <router-outlet></router-outlet>    
  `,
  styles: [`
    
  `]
})
export class AppComponent {

  constructor(private loginService: ScrAuthenticationLoginService) {
    let tokenStorageKey = ScrAuthenticationStore.tokenName();
    this.loginService.loginStateChanged.subscribe(() => {
      let token = localStorage.getItem(tokenStorageKey);
      console.log(token);
    })
  }
}

