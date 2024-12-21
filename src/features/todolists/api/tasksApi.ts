import { baseApi } from "app/baseApi";
import type { Response } from "../../../common/types/types";
import {
  type DomainTask,
  type GetTasksResponse,
  type UpdateTaskModel,
} from "./tasksApi.types";
export const PAGE_SIZE = 4;
// export const _tasksAPI = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
//   },
//   createTask(payload: { todolistId: string; title: string }) {
//     const { todolistId, title } = payload;
//     return instance.post<Response<{ item: DomainTask }>>(
//       `todo-lists/${todolistId}/tasks`,
//       { title }
//     );
//   },
//   removeTask(payload: { todolistId: string; taskId: string }) {
//     const { todolistId, taskId } = payload;
//     return instance.delete<Response>(`todo-lists/${todolistId}/tasks/${taskId}`);
//   },
//   updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
//     const { todolistId, taskId, model } = payload;
//     return instance.put<Response<{ item: DomainTask }>>(
//       `todo-lists/${todolistId}/tasks/${taskId}`,
//       model
//     );
//   },
// };
export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<
      GetTasksResponse,
      { todolistId: string; args: { page: number } }
      // { todolistId: string; params: { count: number; page: number } }
    >({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE };
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          // url: `/todo-lists/${todolistId}/tasks?page=${params.page}&count=${PAGE_SIZE}`,
          params,
        };
      },
      // 1
      // providesTags: ["Task"],
      // 2
      // providesTags: (res) =>
      //   res ? res.items.map(({ id }) => ({ type: "Task", id })) : ["Task"],
      // 3
      providesTags: (res, err, { todolistId }) =>
        res
          ? [
              ...res.items.map(({ id }) => ({ type: "Task", id } as const)),
              { type: "Task", id: todolistId },
            ]
          : ["Task"],
      //
      // transformResponse(todolists: Todolist[]): DomainTodolist[] {
      //   return todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }));
      // },
    }),
    createTask: build.mutation<
      Response<{ item: DomainTask }>,
      { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (res, err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: build.mutation<
      Response<{ item: DomainTask }>,
      { todolistId: string; taskId: string; task: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, task }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: (res, err, { taskId }) => [{ type: "Task", id: taskId }],
    }),
    removeTask: build.mutation<Response, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Task"],
      invalidatesTags: (res, err, { taskId }) => [{ type: "Task", id: taskId }],
    }),
  }),
});

export const {
  useRemoveTaskMutation,
  useUpdateTaskMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
} = taskApi;
