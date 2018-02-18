import {SCR_DEFAULT_JWT_TOKEN_STORAGE_KEY} from "../authentication.const";

export class ScrAuthenticationTokenStoreConfig {

  static readonly storageKeys: any = {
    token: SCR_DEFAULT_JWT_TOKEN_STORAGE_KEY
  };

  static fetch(): ScrAuthenticationTokenStoreConfig {
    let token = sessionStorage.getItem(ScrAuthenticationTokenStoreConfig.storageKeys.token) || '';

    return new ScrAuthenticationTokenStoreConfig(token);
  }

  constructor(
    public token: string,
  ) {

  }

  public save() {
    for(let key in ScrAuthenticationTokenStoreConfig.storageKeys) {
      sessionStorage.setItem(
        ScrAuthenticationTokenStoreConfig.storageKeys[key],
        this[key]
      );
    }
  }
}
