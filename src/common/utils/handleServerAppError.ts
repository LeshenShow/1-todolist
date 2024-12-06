import type { AppDispatch } from "app/store";
import { Response } from "common/types";
import { setAppError, setAppStatus } from "../../app/appSlice";

export const handleServerAppError = <T>(data: Response<T>, dispatch: AppDispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }));
  } else {
    dispatch(setAppError({ error: "Some error occurred" }));
  }
  dispatch(setAppStatus({ status: "failed" }));
};
