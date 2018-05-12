import {ScrAuthenticationStoreConfig} from "./authentication-store-config.model";

export class ScrAuthenticationStore {

  public static base(): string {
    const config = ScrAuthenticationStoreConfig.fetch();
    return config.base;
  }

  public static loginResource(): string {
    return `${ScrAuthenticationStore.base()}/login`;
  }

  public static tokenResource(): string {
    return `${ScrAuthenticationStore.base()}/token`;
  }

  public static registerResource(): string {
    return `${ScrAuthenticationStore.base()}/register`;
  }

  public static tokenName(): string {
    return ScrAuthenticationStoreConfig.fetch().token;
  }

  public static passwordReset(): string {
    return `${ScrAuthenticationStore.base()}/reset`;
  }

  public static setToken(token: string) {
    if(!!token) {
      localStorage.setItem(ScrAuthenticationStore.tokenName(), token);
    }
  }

  public static getToken(): string {
    return localStorage.getItem(ScrAuthenticationStore.tokenName());
  }
}
