import { createSlice } from "@reduxjs/toolkit";
import { setAppStatus } from "app/appSlice";
import type { AppThunk } from "app/store";
import { handleServerAppError, handleServerNetworkError } from "common/utils";
import { ResultCode } from "features/todolists/lib/enums";
import { clearTasks } from "features/todolists/model";
import { clearData } from "features/todolists/model/todolistsSlice";
import { authApi } from "../api/authApi";
import type { LoginArgs } from "../api/authApi.types";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: create => ({
    setLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
    setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized;
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsInitialized: state => state.isInitialized,
  },
});
export const authReducer = authSlice.reducer;
export const { setLoggedIn, setIsInitialized } = authSlice.actions;
export const { selectIsInitialized, selectIsLoggedIn } = authSlice.selectors;

export const initializeAppTC = (): AppThunk => dispatch => {
  dispatch(setAppStatus({ status: "loading" }));
  authApi
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(setLoggedIn({ isLoggedIn: true }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }));
    });
};
export const loginTC =
  (payload: { data: LoginArgs }): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: "loading" }));
    authApi
      .login(payload.data)
      .then(res => {
        if (res.data.resultCode === ResultCode.Success) {
          localStorage.setItem("token", res.data.data.token);
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(setLoggedIn({ isLoggedIn: true }));
        } else {
          handleServerAppError(res.data, dispatch);
          dispatch(setLoggedIn({ isLoggedIn: false }));
        }
      })
      .catch(e => {
        handleServerNetworkError(e, dispatch);
      });
  };
export const logoutTC = (): AppThunk => dispatch => {
  dispatch(setAppStatus({ status: "loading" }));
  authApi
    .logout()
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(setLoggedIn({ isLoggedIn: false }));
        dispatch(clearData());
        dispatch(clearTasks());
        localStorage.removeItem("token");
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};
// const initialState = {
//   isLoggedIn: false,
//   isInitialized: false,
// };
// reducers: {
//   setLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
//     // return { ...state, isLoggedIn: action.payload.isLoggedIn };
//     state.isLoggedIn = action.payload.isLoggedIn;
//   },
//   setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
//     state.isInitialized = action.payload.isInitialized;
//   },
// export const _authReducer = (state: State = initialState, action: Actions): State => {
//   switch (action.type) {
//     case "SET_AUTH_LOGIN": {
//       return { ...state, isLoggedIn: action.payload.isLoggedIn };
//     }
//     case "SET_IS_INITIALIZED": {
//       return { ...state, isInitialized: action.payload.isInitialized };
//     }
//     default:
//       return state;
//   }
// };
// export const loginAC = (isLoggedIn: boolean) => {
//   return { type: "SET_AUTH_LOGIN", payload: { isLoggedIn } } as const;
// };
// const setIsInitializedAC = (isInitialized: boolean) => {
//   return { type: "SET_IS_INITIALIZED", payload: { isInitialized } } as const;
// };
// type State = typeof initialState;
// export type LoginAction = ReturnType<typeof loginAC>;
// export type SetIsInitializedAC = ReturnType<typeof setIsInitializedAC>;
