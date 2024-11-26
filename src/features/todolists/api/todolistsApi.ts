import { instance } from "../../../common/instance/instance";
import type { Response } from "../../../common/types/types";
import type { DomainTodolist } from "./todolistsApi.types";

export const todolistAPI = {
  getTodolists() {
    return instance.get<DomainTodolist[]>("todo-lists/");
  },
  createTodolist(payload: { title: string }) {
    const { title } = payload;
    return instance.post<Response<{ item: DomainTodolist }>>("todo-lists/", { title });
  },
  removeTodolist(payload: { todolistId: string }) {
    const { todolistId } = payload;
    return instance.delete<Response>(`todo-lists/${todolistId}`);
  },
  updateTodolist(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload;
    return instance.put<Response>(`todo-lists/${todolistId}`, {
      title,
    });
  },
};
