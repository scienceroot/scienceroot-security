import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ScrAuthenticationLoginService {

  /**
   * Subject triggers everytime the login state is changing.
   *
   * @type {Subject<any>} emits either true or false for login.
   */
  public loginStateChanged: Subject<boolean> = new Subject();

  constructor() {
  }

  public login() {
    this.loginStateChanged.next(true);
  }
}
