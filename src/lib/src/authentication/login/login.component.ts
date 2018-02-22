import {Component} from "@angular/core";
import {ScrAuthenticationLoginService} from "./login.service";
import {Router} from "@angular/router";
import {__core_private_testing_placeholder__} from "@angular/core/testing";
import {ScrAuthenticationStore} from "../store/authentication.store";

@Component({
  selector: '',
  template: `
    <div>
      <div class="errors">
        <div  class="error"
              *ngIf="passwordIncorrectError">
          Incorrect password for username.
        </div>
        <div  class="error"
              *ngIf="userNotExistError">
          Username not found.
        </div>
        <div  class="error"
              *ngIf="defaultError">
          We're sorry! Something went wrong, please try again later.
        </div>
      </div>
      <div>
        <mat-form-field>
          <input  matInput=""
                  [(ngModel)]="username"
                  placeholder="Username"
                  required />
        </mat-form-field>
      </div>
      <div>
        <mat-form-field>
          <input  matInput=""
                  [(ngModel)]="password"
                  type="password"
                  placeholder="Password"
                  required />
        </mat-form-field>
      </div>
      <div>
        <div>
          <a  mat-button=""
              [routerLink]="['/user', 'new']">
            Create new account
          </a>
        </div>
        <div>
          <button mat-raised-button=""
                  (click)="submit()"
                  color="accent"
                  type="button">
            Login
          </button>
        </div>
      </div>
    </div>  
  `,
  styles: [`
  
  `]
})
export class ScrAuthenticationLoginComponent {

  public username: string;
  public password: string;

  public passwordIncorrectError: boolean = false;
  public userNotExistError: boolean = false;
  public defaultError: boolean = false;

  constructor(
    private loginService: ScrAuthenticationLoginService,
    private router: Router
  ) {
    let token = ScrAuthenticationStore.getToken();
    if(!!token) {
      this.loginService.renewToken()
        .then(() => this.redirectOnLogin());
    }
  }

  public submit() {
    if(!!this.username && !!this.password) {
      this.loginService.login(this.username, this.password)
        .then(() => this.redirectOnLogin())
        .catch(error => this.setErrors(error));
    }
  }

  private redirectOnLogin() {
    if(!!this.loginService.redirectUrl) {
      this.router.navigateByUrl(this.loginService.redirectUrl);
    } else {
      this.router.navigate(['/'])
    }
  }

  private setErrors(error: any) {
    console.error(error);
    this.resetErrors();

    switch(error.status) {
      case 401:
        this.passwordIncorrectError = true;
        break;
      case 404:
        this.userNotExistError = true;
        break;
      default:
        this.defaultError = true;
    }
  }

  private resetErrors() {
    this.userNotExistError = false;
    this.passwordIncorrectError = false;
    this.defaultError = false;
  }
}
