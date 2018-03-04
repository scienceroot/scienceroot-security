import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import "rxjs/add/operator/map";
import {ScrAuthenticationStore} from "../store/authentication.store";

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
    let token = ScrAuthenticationStore.getToken();
    if(!!token) {
      this.renewToken();
    }
  }

  public login(mail: string, password: string): Promise<string> {
    return this.httpClient.post(
        ScrAuthenticationStore.loginResource(),
      {mail: mail, password: password},
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

  public renewToken(): Promise<boolean> {
    let url = ScrAuthenticationStore.tokenResource();
    let token = ScrAuthenticationStore.getToken();
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
    ScrAuthenticationStore.setToken(token);
    this.setLoginStatus(true);
  }

  private setLoginStatus(status: boolean) {
    // just propagate if status changes
    if(status !== this.isAuthenticated) {
      this.loginStateChanged.next(status);
    }

    this.isAuthenticated = status;
  }
}
