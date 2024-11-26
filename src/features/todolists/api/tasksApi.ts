import { instance } from "../../../common/instance/instance";
import type { Response } from "../../../common/types/types";
import {
  type DomainTask,
  type GetTasksResponse,
  type UpdateTaskModel,
} from "./tasksApi.types";

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload;
    return instance.post<Response<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },
  removeTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload;
    return instance.delete<Response>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload;
    return instance.put<Response<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
};
