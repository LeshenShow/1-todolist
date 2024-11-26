type InitialState = typeof initialState;
const initialState = {
  themeMode: "dark" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as Error,
};
export const appReducer = (
  state: InitialState = initialState,
  action: Actions
): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME_MODE": {
      const { themeMode } = action.payload;
      return {
        ...state,
        themeMode,
      };
    }
    case "SET_STATUS": {
      return { ...state, status: action.payload.status };
    }
    case "SET_ERROR": {
      return { ...state, error: action.payload.error };
    }
    default:
      return state;
  }
};

export const changeThemeModeAC = (themeMode: ThemeMode) => {
  return {
    type: "CHANGE_THEME_MODE",
    payload: { themeMode },
  } as const;
};
export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: { status },
  } as const;
};
export const setAppErrorAC = (error: Error) => {
  return {
    type: "SET_ERROR",
    payload: { error },
  } as const;
};
export type ThemeMode = "light" | "dark";
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
export type Error = string | null;
export type ChangeError = ReturnType<typeof setAppErrorAC>;
export type ChangeStatus = ReturnType<typeof setAppStatusAC>;
export type ChangeThemeMode = ReturnType<typeof changeThemeModeAC>;
export type Actions = ChangeThemeMode | ChangeStatus | ChangeError;
