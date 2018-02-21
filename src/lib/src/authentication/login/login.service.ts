import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpResponse} from "@angular/common/http";
import "rxjs/add/operator/map";
import {ScrAuthenticationTokenStore} from "../store/token.store";

const SCR_USER_BASE_PATH: string = 'http://localhost:8080';
//const SCR_USER_BASE_PATH: string = 'https://api.scienceroots.com/users';
const SCR_LOGIN_PATH: string = SCR_USER_BASE_PATH + '/login';

@Injectable()
export class ScrAuthenticationLoginService {

  /**
   * Subject triggers every time the login state is changing.
   *
   * @type {Subject<any>} emits either true or false for login.
   */
  public loginStateChanged: Subject<boolean> = new Subject();

  /**
   * Stores the url requested before redirected to login.
   */
  public redirectUrl: string;

  private isAuthenticated: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  public login(username: string, password: string): Promise<any> {
    return this.httpClient.post(
        SCR_LOGIN_PATH,
        {username: username, password: password},
      {observe: 'response'}
      )
      .toPromise()
      .then((res: HttpResponse<any>) => {
        let token: string = res.headers.get('Authorization');

        if(!!token) {
          this.setLoginStatus(true);
          ScrAuthenticationTokenStore.setToken(token)
        }

        return res.body;
      }).catch((error: any) => {
        this.setLoginStatus(false);
        console.error(error);

        throw error;
      });
  }

  public authenticated(): boolean {
    return this.isAuthenticated;
  }

  private setLoginStatus(status: boolean) {
    // just propagate if status changes
    if(status !== this.isAuthenticated) {
      this.loginStateChanged.next(status);
    }

    this.isAuthenticated = status;
  }
}
