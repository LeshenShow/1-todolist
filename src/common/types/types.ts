export type Response<T = {}> = {
  data: T;
  resultCode: number;
  messages: string[];
  fieldsErrors: { error: string; field: string };
};
export type FilterValuesType = "all" | "active" | "completed";
