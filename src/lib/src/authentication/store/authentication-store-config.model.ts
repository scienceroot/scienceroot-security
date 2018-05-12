import {
  SCR_DEFAULT_BASE_STORAGE_KEY,
  SCR_DEFAULT_JWT_TOKEN_STORAGE_KEY
} from '../authentication.const';

export class ScrAuthenticationStoreConfig {

  public static readonly storageKeys: any = {
    base: SCR_DEFAULT_BASE_STORAGE_KEY,
    token: SCR_DEFAULT_JWT_TOKEN_STORAGE_KEY,
  };

  public static fetch(): ScrAuthenticationStoreConfig {
    let base = sessionStorage.getItem(ScrAuthenticationStoreConfig.storageKeys.base) || '';
    let token = sessionStorage.getItem(ScrAuthenticationStoreConfig.storageKeys.token) || '';

    return new ScrAuthenticationStoreConfig(base, token);
  }

  constructor(
    public base: string,
    public token: string
  ) {

  }

  public save() {
    for(const key in ScrAuthenticationStoreConfig.storageKeys) {
      if (ScrAuthenticationStoreConfig.storageKeys.hasOwnProperty(key)) {
        sessionStorage.setItem(
          ScrAuthenticationStoreConfig.storageKeys[key],
          this[key]
        );
      }
    }
  }
}
