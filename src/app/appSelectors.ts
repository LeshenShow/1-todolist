import type { RootState } from "./store";

export const selectThemeMode = (state: RootState) => state.app.themeMode;
export const selectAppStatus = (state: RootState) => state.app.status;
export const selectError = (state: RootState) => state.app.error;
export const selectTasks = (state: RootState) => state.tasks;
export const selectTodolists = (state: RootState) => state.todolists;
