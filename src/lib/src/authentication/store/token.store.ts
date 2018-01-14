import {ScrAuthenticationTokenStoreConfig} from "./token-store-config.model";

export class ScrAuthenticationTokenStore {

  public tokenName(): string {
    return ScrAuthenticationTokenStoreConfig.fetch().token;
  }
}
