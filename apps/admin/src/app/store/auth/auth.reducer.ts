import { createReducer, on } from '@ngrx/store';
import { AppAuthActions } from './auth.action';
import { AppAuthState } from './auth.state';
import { AuthLoggedInUserDto } from 'apps/admin/src/api/models/auth.request';

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'access_token';
const LOCAL_STORAGE_KEY_USER = 'user';

function validateUserFromLocalStorage(o: any): o is AuthLoggedInUserDto {
  return 'uid' in o && 'full_name' in o && 'permissions' in o;
}

function getAccessTokenFromLocalStorage(): string | null {
  const access_token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
  return access_token;
}

function setAccessTokenToLocalStorage(access_token: string): void {
  localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, access_token);
}

function getUserFromLocalStorage(): AuthLoggedInUserDto | null {
  const serialized_user = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
  if (serialized_user) {
    const user = JSON.parse(serialized_user);
    if (validateUserFromLocalStorage(user)) {
      return user;
    }
  }
  return null;
}

function setUserToLocalStorage(user: AuthLoggedInUserDto): void {
  localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user));
}

function removeAccessTokenFromLocalStorage(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
}

function removeUserFromLocalStorage(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
}

export const defaultAppAuthState: AppAuthState = {
  access_token: getAccessTokenFromLocalStorage(),
  user: getUserFromLocalStorage(),
};

export const appAuthReducer = createReducer<AppAuthState>(
  defaultAppAuthState,
  on(AppAuthActions.login, (state, props) => {
    setAccessTokenToLocalStorage(props.access_token);
    setUserToLocalStorage(props.user);

    return {
      access_token: props.access_token,
      user: props.user,
    };
  }),
  on(AppAuthActions.logout, (_) => {
    removeAccessTokenFromLocalStorage();
    removeUserFromLocalStorage();
    return {
      access_token: null,
      user: null,
    };
  }),
  on(AppAuthActions.update, (state, props) => {

    const user = { ...state.user, phone_number: props.phone_number } as AuthLoggedInUserDto;
    setUserToLocalStorage(user);

    return {
      ...state,
      phone_number: props.phone_number,
    };
  })
);
