import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ScrAuthenticationStore} from '../store/authentication.store';

@Injectable()
export class ScrPasswordResetService {

  constructor(private _httpClient: HttpClient) {
  }

  public reset(mail: string): Promise<any> {
    const url: string = ScrAuthenticationStore.passwordReset();

    return this._httpClient.post(url, mail)
      .toPromise();
  }

  public set(newPassword: string, token: string): Promise<any> {
    const url: string = ScrAuthenticationStore.passwordSet();

    let header = new HttpHeaders();
    header = header.append('Authorization', token);

    return this._httpClient.post(url, newPassword, {headers: header}).toPromise();
  }
}
