import {NgModule} from "@angular/core";
import {ScrRestrictedDemoComponent} from "./restricted.component";
import {RouterModule} from "@angular/router";
import {ScrAuthenticationGuard} from "security";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'restricted', component: ScrRestrictedDemoComponent, canActivate: [ScrAuthenticationGuard] }
    ])
  ],
  declarations: [
    ScrRestrictedDemoComponent
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class ScrRestrictedDemoModule {

}
