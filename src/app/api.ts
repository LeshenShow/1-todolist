import axios from "axios";
import type { Task, Todolist } from "./AppHttpRequests";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    Authorization: `Bearer f7deb3b6-191d-4420-9828-d2ec70f8bad4`,
    "API-KEY": "72c984dc-4e19-428a-8ec4-adaf5048c782",
  },
});
const todolistURL = `todo-lists`;
export enum TaskStatus {
  notReady,
  part,
  done,
}
export const todolistAPI = {
  getTodolists() {
    return instance.get<Todolist[]>(todolistURL);
  },
  createTodolist(title: string) {
    return instance.post<Response<{ item: Todolist }>>(todolistURL, { title });
  },
  removeTodolist(id: string) {
    return instance.delete<Response>(`${todolistURL}/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<Response>(`${todolistURL}/${id}`, { title });
  },
};
export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`${todolistURL}/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<Response<{ item: Task }>>(`${todolistURL}/${todolistId}/tasks`, {
      title,
    });
  },
  removeTask(todolistId: string, taskId: string) {
    return instance.delete<Response>(`${todolistURL}/${todolistId}/tasks/${taskId}`);
  },
  changeTaskStatus(todolistId: string, task: Task, checked: boolean) {
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: checked ? TaskStatus.done : TaskStatus.notReady,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };
    return instance.put<Response<{ item: Task }>>(
      `${todolistURL}/${todolistId}/tasks/${task.id}`,
      model
    );
  },
  changeTaskTitle(todolistId: string, task: Task, title: string) {
    const model: UpdateTaskModel = {
      description: task.description,
      title: title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    };
    return instance.put<Response<{ item: Task }>>(
      `${todolistURL}/${todolistId}/tasks/${task.id}`,
      model
    );
  },
};
type Response<T = {}> = {
  data: T;
  resultCode: number;
  messages: string[];
  fieldsErrors: { error: string; field: string };
};
type GetTasksResponse = {
  items: Task[];
  totalCount: number;
  error: string;
};
type UpdateTaskModel = {
  description: string | null;
  title: string;
  status: number;
  priority: number;
  startDate: string | null;
  deadline: string | null;
};
