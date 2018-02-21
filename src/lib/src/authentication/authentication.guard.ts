import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ScrAuthenticationLoginService} from "./login/login.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ScrAuthenticationGuard implements CanActivate {

  constructor(
    private loginService: ScrAuthenticationLoginService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let authenticated: boolean = this.loginService.authenticated();

    if(authenticated) {
      return true;
    } else {
      this.loginService.redirectUrl = state.url;

      this.router.navigate(['/login']);
      return false;
    }
  }

}
