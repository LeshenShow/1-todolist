import Alert from "@mui/material/Alert";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

import { selectError, setAppError } from "app/appSlice";
import { useAppDispatch, useAppSelector } from "common/hooks";

export function ErrorSnackbar() {
  // const [open, setOpen] = useState(false);
  // const handleClick = () => {setOpen(true)};
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    // setOpen(false);
    dispatch(setAppError({ error: null }));
  };

  return (
    // <div>
    // {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
    <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
    //    </div>
  );
}
