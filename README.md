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
