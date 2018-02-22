import {ScrAuthenticationStoreConfig} from "./authentication-store-config.model";

export class ScrAuthenticationStore {

  public static loginResource(): string {
    return ScrAuthenticationStoreConfig.fetch().login;
  }

  public static tokenResource(): string {
    return ScrAuthenticationStoreConfig.fetch().tokenRenew;
  }

  public static registerResource(): string {
    return ScrAuthenticationStoreConfig.fetch().register;
  }

  public static tokenName(): string {
    return ScrAuthenticationStoreConfig.fetch().token;
  }

  public static setToken(token: string) {
    if(!!token) {
      localStorage.setItem(ScrAuthenticationStore.tokenName(), token);
    }
  }

  public static getToken(): string {
    let token = localStorage.getItem(ScrAuthenticationStore.tokenName());

    return token;
  }
}
