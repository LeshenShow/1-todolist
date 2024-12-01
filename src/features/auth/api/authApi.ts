import { instance } from "common/instance";
import type { Response } from "common/types";
import type { LoginArgs } from "./authApi.types";
export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<Response<{ userId: number; token: string }>>(
      `auth/login`,
      payload
    );
  },
  logout() {
    return instance.delete<Response>(`auth/login`);
  },
  me() {
    return instance.get<Response<{ id: number; email: string; login: string }>>(
      "auth/me"
    );
  },
};
