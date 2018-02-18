# scienceroot/security

Contains all authentication and authorization functionality for scienceroot frontend.

## Install

```bash
npm install @scienceroot/security

#or

yarn add @scienceroot/security
```

## Usage

```typescript
@NgModule({
  imports:      [
    BrowserModule,
    RouterModule.forRoot([]),
    ScrAuthenticationModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {
}
```

### Get login state

```typescript
@Component({ })
export class SomeComponent {
  
  constructor(private loginService: ScrAuthenticationLoginService) {
    let login = this.loginService.authenticated();
    if(login) {
      // user is logged in
    } else {
      // unauthenticated user 
    }
  }
}
```

### Subscribe to login state

```typescript
@Component({ })
export class SomeComponent {
  
  constructor(private loginService: ScrAuthenticationLoginService) {
    this.loginService.loginStateChanged.subscribe((loginState: boolean) => {
      if(loginState) {
        // user is logged in
      } else {
        // unauthenticated user 
      }
    })
  }
}
```

### Restrict routes to authenticated users

```typescript
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'restricted', component: RestrictedComponent, canActivate: [ScrAuthenticationGuard] }
    ])
  ],
  declarations: [RestrictedComponent],
  exports: [RouterModule]
})
export class RestrictedDemoModule {

}
```
