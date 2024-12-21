import { baseApi } from "app/baseApi";
import type { Response } from "../../../common/types/types";
import type { DomainTodolist, Todolist } from "./todolistsApi.types";
//export const _todolistAPI = {
// getTodolists() {
//   return instance.get<DomainTodolist[]>("todo-lists/");
// },
// createTodolist(payload: { title: string }) {
//   const { title } = payload;
//   return instance.post<Response<{ item: Todolist }>>("todo-lists/", { title });
// },
// removeTodolist(payload: { todolistId: string }) {
//   const { todolistId } = payload;
//   return instance.delete<Response>(`todo-lists/${todolistId}`);
// },
// updateTodolist(payload: { todolistId: string; title: string }) {
//   const { todolistId, title } = payload;
//   return instance.put<Response>(`todo-lists/${todolistId}`, {
//     title,
//   });
// },
//};

export const todolistsApi = baseApi.injectEndpoints({
  // reducerPath: "todolistsApi",
  // tagTypes: ["Todolist"],
  // baseQuery: fetchBaseQuery({
  //   baseUrl: process.env.REACT_APP_BASE_URL,
  //   prepareHeaders: headers => {
  //     headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
  //     headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
  //   },
  // }),
  endpoints: build => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      providesTags: ["Todolist"],
      // query: () => {return {url: "todo-lists", method: "GET"};},
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }));
      },
    }),
    createTodolist: build.mutation<Response<{ item: Todolist }>, { title: string }>({
      query: ({ title }) => ({
        url: "todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolist: build.mutation<Response, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    removeTodolist: build.mutation<Response, { id: string }>({
      query: ({ id }) => ({
        url: `todo-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
});

export const {
  useGetTodolistsQuery,
  useLazyGetTodolistsQuery,
  useCreateTodolistMutation,
  useUpdateTodolistMutation,
  useRemoveTodolistMutation,
} = todolistsApi;
