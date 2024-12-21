import { baseApi } from "app/baseApi";
import { instance } from "common/instance";
import type { Response } from "common/types";
import type { LoginArgs } from "./authApi.types";

export const _authApi = {
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

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<Response<{ id: number; email: string; login: string }>, void>({
      // что придет, что вернет
      query: () => "auth/me",
      // query: () => {return {url: "auth/me", method: "GET"};},
      // providesTags: [""],
    }),
    login: build.mutation<Response<{ userId: number; token: string }>, LoginArgs>({
      query: body => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      // invalidatesTags: ["Todolist"],
    }),
    logout: build.mutation<Response, void>({
      query: () => ({
        url: `auth/login`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Todolist"],
    }),
  }),
});

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi;
