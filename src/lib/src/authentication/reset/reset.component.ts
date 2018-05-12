import {Component} from '@angular/core';
import {ScrPasswordResetService} from './reset.service';

@Component({
  selector: '',
  template: `
    <div>
      <scr-loading>
        <div onInit>
          <div  class="scr-warn-text"
                *ngIf="!!error">
            <span class="mat-body-1">{{error}}</span>
          </div>
          <form>
            <div fxLayout="row">
              <div fxFlex="">
                <mat-form-field>
                  <input  matInput=""
                          [(ngModel)]="mail"
                          name="mail"
                          placeholder="Your mail address"
                          type="email">
                </mat-form-field>
              </div>
            </div>
            <div  fxLayout="row"
                  fxLayoutGap="24px">
              <div fxFlex="110px">
                <button mat-raised-button=""
                        (click)="resetPassword()"
                        type="button"
                        color="accent">
                  <span>Reset password</span>
                </button>
              </div>
              <div fxFlex="100px">
                <a  mat-button=""
                    type="button"
                    [routerLink]="['/login']">
                  <span>Back to login</span>
                </a>
              </div>
              <div fxFlex="160px">
                <a  mat-button=""
                    type="button"
                    [routerLink]="['/users', 'new']">
                  <span>Create new account</span>
                </a>
              </div>
            </div>
          </form>
        </div>
        <div onFinish>
          <div class="mat-body-1">
            We sent you a mail including a link to set your new password.
          </div>
          <div class="mat-body-1">
            Don't forget to check your spam filter.
          </div>
          <div>
            <div>
              <button mat-raised-button="">
                <span>Send again</span>
              </button>
            </div>
          </div>
        </div>
      </scr-loading>
    </div>
  `,
  styles: [`
    :host /deep/ mat-form-field {
      width: 100%;
    }
  `]
})
export class ScrPasswordResetComponent {

  public error: string = null;
  public mail: string;

  public resetReq: Promise<any>;

  constructor(
    private _resetService: ScrPasswordResetService
  ) {

  }

  public resetPassword() {
    if (this._mailIsValid(this.mail)) {
      this.resetReq = this._resetService.reset(this.mail)
        .catch(error => console.error(error));
    }
  }

  private _mailIsValid(mail: string): boolean {
    let isValid = true;

    if (!mail || mail.length === 0) {
      this.error = 'Please input your email.'
      isValid = false;
    } else if (!MAIL_REGEX.test(mail.toLowerCase())) {
      this.error = 'Please input a valid email.'
      isValid = false;
    } else {
      this.error = null;
    }

    return isValid;
  }
}

const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
