import {ScrAuthenticationTokenStore} from "../store/token.store";

export function authOptionsFactory(authStore: ScrAuthenticationTokenStore): {} {
  let tokenName = authStore.tokenName();

  let tokenGetter = (): string => {
    return localStorage.getItem(tokenName);
  };

  return {
    tokenGetter: tokenGetter,
    authScheme: '',
    whitelistedDomains: []
  };
}
