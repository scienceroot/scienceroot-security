import {Component} from "@angular/core";
import {ScrAuthenticationLoginService} from "./login.service";
import {Router} from "@angular/router";
import {ScrAuthenticationStore} from "../store/authentication.store";

@Component({
  selector: '',
  template: `
    <form fxLayout="column">

      <div fxFlex=""
           class="scr-warn-text">
        <div  class="mat-body-1"
              *ngIf="passwordIncorrectError">
          <p>Incorrect password for mail.</p>
        </div>
        <div  class="mat-body-1"
              *ngIf="userNotExistError">
          <p>Username not found.</p>
        </div>
        <div  class="mat-body-1"
              *ngIf="defaultError">
          <p>We're sorry! Something went wrong, please try again later.</p>
        </div>
      </div>

      <div fxFlex="">
        <mat-form-field>
          <input matInput=""
                 [(ngModel)]="mail"
                 placeholder="Mail"
                 name="mail"
                 required />
        </mat-form-field>
      </div>
      <div fxFlex="">
        <mat-form-field>
          <input  matInput=""
                  [(ngModel)]="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required />
        </mat-form-field>
      </div>
      <div fxFlex=""
           fxLayout="row">

        <div fxFlex="150px">
          <button mat-raised-button=""
                  (click)="submit()"
                  color="accent"
                  type="submit">
            Login
          </button>
        </div>
        <div fxFlex="150px">
          <a mat-button=""
             [routerLink]="['/user', 'new']">
            Create new account
          </a>
        </div>

      </div>
    </form>  
  `,
  styles: [`
    :host /deep/ mat-form-field {
      width: 100%;
    }
  `]
})
export class ScrAuthenticationLoginComponent {

  public mail: string;
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
    if (!!this.mail && !!this.password) {
      this.loginService.login(this.mail, this.password)
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
