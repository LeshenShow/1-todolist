import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleError } from "common/utils";

// export const baseApi = createApi({
//   reducerPath: "todolistsApi",
//   tagTypes: ["Todolist", "Task"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.REACT_APP_BASE_URL,
//     prepareHeaders: headers => {
//       headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
//       headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
//     },
//   }),
//   endpoints: () => ({}),
// });

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
        headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      },
    })(args, api, extraOptions);
    handleError(api, result);
    return result;
  },
  keepUnusedDataFor: 60, //удерживание данных в кеше
  refetchOnFocus: true, //обновление данных при возвращения фокуса страницы
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes: ["Todolist", "Task"],
});
