import {
  SCR_DEFAULT_JWT_TOKEN_STORAGE_KEY, SCR_DEFAULT_LOGIN_PATH_STORAGE_KEY,
  SCR_DEFAULT_REGISTER_PATH_STORAGE_KEY, SCR_DEFAULT_TOKEN_RENEW_PATH_STORAGE_KEY
} from "../authentication.const";

export class ScrAuthenticationStoreConfig {

  public static readonly storageKeys: any = {
    token: SCR_DEFAULT_JWT_TOKEN_STORAGE_KEY,
    register: SCR_DEFAULT_REGISTER_PATH_STORAGE_KEY,
    login: SCR_DEFAULT_LOGIN_PATH_STORAGE_KEY,
    tokenRenew: SCR_DEFAULT_TOKEN_RENEW_PATH_STORAGE_KEY
  };

  public static fetch(): ScrAuthenticationStoreConfig {
    let token = sessionStorage.getItem(ScrAuthenticationStoreConfig.storageKeys.token) || '';
    let register = sessionStorage.getItem(ScrAuthenticationStoreConfig.storageKeys.register) || '';
    let login = sessionStorage.getItem(ScrAuthenticationStoreConfig.storageKeys.login) || '';
    let tokenRenew = sessionStorage.getItem(ScrAuthenticationStoreConfig.storageKeys.tokenRenew) || '';

    return new ScrAuthenticationStoreConfig(token, register, login, tokenRenew);
  }

  constructor(
    public token: string,
    public register: string,
    public login: string,
    public tokenRenew: string
  ) {

  }

  public save() {
    for(let key in ScrAuthenticationStoreConfig.storageKeys) {
      sessionStorage.setItem(
        ScrAuthenticationStoreConfig.storageKeys[key],
        this[key]
      );
    }
  }
}
