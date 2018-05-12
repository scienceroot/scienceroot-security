import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ScrAuthenticationStore} from "../store/authentication.store";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators"
@Injectable()
export class ScrAuthenticationInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqClone: HttpRequest<any>;
    let token: string = ScrAuthenticationStore.getToken();

    if(!!token) {
      reqClone = req.clone({
        setHeaders: {
          'Authorization': token
        }
      });
    } else {
      reqClone = req.clone();
    }

    return next.handle(reqClone).pipe(
      tap((event: HttpEvent<any>) => {}, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      })
    );
  }
}
