import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import "rxjs/add/operator/map";
import {ScrAuthenticationTokenStore} from "../store/token.store";

const SCR_USER_BASE_PATH: string = 'http://localhost:8080';
//const SCR_USER_BASE_PATH: string = 'https://api.scienceroots.com/users';
const SCR_LOGIN_PATH: string = SCR_USER_BASE_PATH + '/login';
const SCR_TOKEN_PATH: string = SCR_USER_BASE_PATH + '/token';

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
    let token = ScrAuthenticationTokenStore.getToken();
    if(!!token) {
      this.isAuthenticated = true;
    }
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
          this.onLoginSuccess(token);
        }

        return res.body;
      }).catch((error: any) => {
        this.setLoginStatus(false);
        console.error(error);

        throw error;
      });
  }

  public renewToken(): Promise<any> {
    let url = SCR_TOKEN_PATH;
    let token = ScrAuthenticationTokenStore.getToken();
    let headers = new HttpHeaders();

    headers = headers.set('Authorization', token);

    return this.httpClient.get(
      url,
      {
        observe: 'response',
        headers: headers
      })
      .toPromise()
      .then((res: HttpResponse<any>) => {
        let token: string = res.headers.get('Authorization');

        if(!!token) {
          this.onLoginSuccess(token);

          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      });
  }

  public authenticated(): boolean {
    return this.isAuthenticated;
  }

  private onLoginSuccess(token: string) {
    this.setLoginStatus(true);
    ScrAuthenticationTokenStore.setToken(token)
  }

  private setLoginStatus(status: boolean) {
    // just propagate if status changes
    if(status !== this.isAuthenticated) {
      this.loginStateChanged.next(status);
    }

    this.isAuthenticated = status;
  }
}
