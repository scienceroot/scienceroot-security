import {ScrAuthenticationTokenStoreConfig} from "./token-store-config.model";

export class ScrAuthenticationTokenStore {

  public static tokenName(): string {
    return ScrAuthenticationTokenStoreConfig.fetch().token;
  }

  public static setToken(token: string) {
    if(!!token) {
      localStorage.setItem(ScrAuthenticationTokenStore.tokenName(), token);
    }
  }

  public static getToken(): string {
    let token = localStorage.getItem(ScrAuthenticationTokenStore.tokenName());

    return token;
  }
}
