import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  type UnknownAction,
} from "redux";
import { thunk, type ThunkAction, type ThunkDispatch } from "redux-thunk";
import { tasksReducer } from "../features/todolists/model/tasks-reducer";
import { todolistsReducer } from "../features/todolists/model/todolists-reducer";
import { appReducer } from "./app-reducer";
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
});
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>; // первый спосод типизации
// export const addTaskTC =
//   (payload: { id: string; title: string }) => (dispatch:AppDispatch, getState: ()=> RootState) => {
//     tasksAPI.addTask(payload).then(res => {
//       dispatch(addTaskAC({ task: res.data.data.item }));});};
export type AppThunk = ThunkAction<void, RootState, unknown, UnknownAction>; // второй способ типизации
// export const addTaskTC =
//   (payload: { id: string; title: string }): AppThunk => (dispatch, getState) => {
//     tasksAPI.addTask(payload).then(res => {
//       dispatch(addTaskAC({ task: res.data.data.item }));});};

// @ts-ignore
//чтобы можно было в консоли браузера обращаться к store в любой момент
window.store = store;
