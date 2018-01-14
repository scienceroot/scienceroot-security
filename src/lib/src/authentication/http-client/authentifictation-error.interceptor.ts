

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import {Router} from "@angular/router";

@Injectable()
export class BdAuthenticationErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(() => {}).catch(error => {

      switch(error.status) {
        case 401:
          console.error('Unauthorized access. Redirecting to login page.', error);
          this.router.navigate(['/login']);
          break;
      }

      return Observable.throw(error);
    });
  }
}
