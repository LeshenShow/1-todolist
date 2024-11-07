type InitialState = typeof initialState;
const initialState = {
  themeMode: "dark" as ThemeMode,
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
export type ThemeMode = "light" | "dark";
export type ChangeThemeMode = ReturnType<typeof changeThemeModeAC>;
export type Actions = ChangeThemeMode;
