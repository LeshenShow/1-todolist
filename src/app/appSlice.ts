import { createSlice } from "@reduxjs/toolkit";

export const appSLice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as Error,
  },
  reducers: create => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setAppError: create.reducer<{ error: Error }>((state, action) => {
      state.error = action.payload.error;
    }),
  }),
  selectors: {
    selectThemeMode: state => state.themeMode,
    selectAppStatus: state => state.status,
    selectError: state => state.error,
  },
});

export const appReducer = appSLice.reducer;
export const { selectThemeMode, selectAppStatus, selectError } = appSLice.selectors;
export const { changeTheme, setAppStatus, setAppError } = appSLice.actions;
export type AppReducerState = ReturnType<typeof appSLice.getInitialState>;
export type ThemeMode = "light" | "dark";
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export type Error = string | null;
// type InitialState = typeof initialState;
// const initialState = {
//   themeMode: "dark" as ThemeMode,
//   status: "idle" as RequestStatus,
//   error: null as Error,
// };
// export const appReducer = (
//   state: InitialState = initialState,
//   action: Actions
// ): InitialState => {
//   switch (action.type) {
//     case "CHANGE_THEME_MODE": {
//       const { themeMode } = action.payload;
//       return {
//         ...state,
//         themeMode,
//       };
//     }
//     case "SET_STATUS": {
//       return { ...state, status: action.payload.status };
//     }
//     case "SET_ERROR": {
//       return { ...state, error: action.payload.error };
//     }
//     default:
//       return state;
//   }
// };
// export const changeThemeModeAC = (themeMode: ThemeMode) => {
//   return {
//     type: "CHANGE_THEME_MODE",
//     payload: { themeMode },
//   } as const;
// };
// export const setAppStatusAC = (status: RequestStatus) => {
//   return {
//     type: "SET_STATUS",
//     payload: { status },
//   } as const;
// };
// export const setAppErrorAC = (error: Error) => {
//   return {
//     type: "SET_ERROR",
//     payload: { error },
//   } as const;
// };
// export type ChangeError = ReturnType<typeof setAppErrorAC>;
// export type ChangeStatus = ReturnType<typeof setAppStatusAC>;
// export type ChangeThemeMode = ReturnType<typeof changeThemeModeAC>;
// export type Actions = ChangeThemeMode | ChangeStatus | ChangeError;
// export const selectThemeMode = (state: RootState) => state.app.themeMode;
// export const selectAppStatus = (state: RootState) => state.app.status;
// export const selectError = (state: RootState) => state.app.error;
// export const selectTasks = (state: RootState) => state.tasks;
// export const selectTodolists = (state: RootState) => state.todolists;
// export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
// export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;
