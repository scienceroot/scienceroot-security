import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScrPasswordResetComponent} from './reset.component';
import {ScrPasswordResetService} from './reset.service';

@Component({
  selector: 'scr-password-set',
  template: `
    <scr-loading [waitFor]="passwordReq">
      <div onInit>
        <div *ngIf="error">
          <span class="scr-warn-text">{{error}}</span>
        </div>
        <form (submit)="set();">
          <div>
            <mat-form-field>
              <input  matInput=""
                      name="password"
                      [(ngModel)]="newPassword"
                      autocomplete="new-password"
                      placeholder="Your new password"
                      type="password"
              />
            </mat-form-field>
          </div>
          <div>
            <mat-form-field>
              <input  matInput=""
                      name="passwordConfirmation"
                      autocomplete="new-password"
                      [(ngModel)]="newPasswordConfirmation"
                      placeholder="Confirm your password"
                      type="password"
              />
            </mat-form-field>
          </div>
          <div>
            <div>
              <button mat-raised-button=""
                      type="submit"
                      color="accent">
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </scr-loading>
  `,
  styles: [`
  
  `]
})
export class ScrPasswordSetComponent {

  public passwordReq: Promise<any>;

  public error: string;
  public token: string;
  public newPassword: string;
  public newPasswordConfirmation: string;

  constructor(
    private _resetService: ScrPasswordResetService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.token = params.t;
    });
  }

  public set() {
    if(this._isValid()) {
      this._resetService.set(this.newPassword, this.token)
        .then(() => this._router.navigate(['/login']));
    }
  }

  private _isValid(): boolean {
    if (this.newPassword !== this.newPasswordConfirmation) {
      this.error = 'Password inputs do not match.';
      return false;
    } else if (!this.token) {
      this.error = 'Used invalid link. Missing authentication token.';
      return false;
    } else {
      this.error = null;
      return true;
    }
  }
}
