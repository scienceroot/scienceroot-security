import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ScrAuthenticationTokenStore} from "../store/token.store";
import {SCR_DEFAULT_JWT_TOKEN_STORAGE_KEY} from "../authentication.const";

@Injectable()
export class ScrAuthenticationInterceptor implements HttpInterceptor {

  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqClone = req.clone();
    let token: string = ScrAuthenticationTokenStore.getToken();

    if(!!token) {
      reqClone.headers.set('Authorization', token);
    }

    return next.handle(reqClone);
  }
}
