import { setAppStatusAC } from "app/app-reducer";
import type { AppThunk } from "app/store";
import { handleServerAppError, handleServerNetworkError } from "common/utils";
import { ResultCode } from "features/todolists/lib/enums";
import { authApi } from "../api/authApi";
import type { LoginArgs } from "../api/authApi.types";

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
};
export const authReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case "SET_AUTH_LOGIN": {
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    }
    case "SET_IS_INITIALIZED": {
      return { ...state, isInitialized: action.payload.isInitialized };
    }
    default:
      return state;
  }
};

export const loginAC = (isLoggedIn: boolean) => {
  return { type: "SET_AUTH_LOGIN", payload: { isLoggedIn } } as const;
};

const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const;
};

export const initializeAppTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC("loading"));
  authApi
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(loginAC(true));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};
export const loginTC =
  (payload: { data: LoginArgs }): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC("loading"));
    authApi
      .login(payload.data)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          localStorage.setItem("token", res.data.data.token);
          dispatch(setAppStatusAC("succeeded"));
          dispatch(loginAC(true));
        } else {
          handleServerAppError(res.data, dispatch);
          dispatch(loginAC(false));
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
export const logoutTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC("loading"));
  authApi
    .logout()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(loginAC(false));
        localStorage.removeItem("token");
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
type State = typeof initialState;
export type LoginAction = ReturnType<typeof loginAC>;
export type SetIsInitializedAC = ReturnType<typeof setIsInitializedAC>;
export type Actions = LoginAction | SetIsInitializedAC;
