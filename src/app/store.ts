import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { type UnknownAction } from "redux";
import { type ThunkAction, type ThunkDispatch } from "redux-thunk";
// import { tasksReducer, tasksSlice } from "../features/todolists/model/tasksSlice";
// import {
//   todolistsReducer,
//   todolistsSlice,
// } from "../features/todolists/model/todolistsSlice";
import { appReducer, appSLice } from "./appSlice";
import { baseApi } from "./baseApi";
export const store = configureStore({
  reducer: {
    // [tasksSlice.name]: tasksReducer,
    // [todolistsSlice.name]: todolistsReducer,
    [appSLice.name]: appReducer,
    // [authSlice.name]: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});
setupListeners(store.dispatch);
// export type AppDispatch = typeof store.dispatch; // rtk
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>; // первый способ типизации
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>;













// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todolistsReducer,
//   app: appReducer,
//   auth: authReducer,
// });

// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));
// export const store = configureStore({ reducer: rootReducer });
// определить автоматически тип всего объекта состояния

// export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>; // первый спосод типизации
// export const addTaskTC =
//   (payload: { id: string; title: string }) => (dispatch:AppDispatch, getState: ()=> RootState) => {
//     tasksAPI.addTask(payload).then(res => {
//       dispatch(addTaskAC({ task: res.data.data.item }));});};
// export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>; // второй способ типизации
// export const addTaskTC =
//   (payload: { id: string; title: string }): AppThunk => (dispatch, getState) => {
//     tasksAPI.addTask(payload).then(res => {
//       dispatch(addTaskAC({ task: res.data.data.item }));});};

// @ts-ignore
//чтобы можно было в консоли браузера обращаться к store в любой момент
// window.store = store;
