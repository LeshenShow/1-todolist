import { ChangeEvent, KeyboardEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, TextField } from "@mui/material";

export function AddItemForm(props: AddItemFormProps) {
  const { addItem } = props;
  const [itemTitle, setItemTitle] = useState("");
  const [error, setError] = useState(false);
  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value);
    error && setError(false);
  };
  const addItemHandler = () => {
    const trimmedTaskTitle = itemTitle.trim();
    trimmedTaskTitle ? addItem(trimmedTaskTitle) : setError(true);
    setItemTitle("");
  };
  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItemHandler();
    }
  };
  return (
    <div>
      <TextField
        variant="outlined"
        // type="text"
        value={itemTitle}
        onChange={changeItemTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
        error={!!error}
        helperText={error}
        size="small"

        // className={error ? "error" : ""}
      />

      <IconButton aria-label="add" onClick={addItemHandler}>
        <AddIcon />
      </IconButton>
      {error && <div style={{ color: "red" }}>Enter value</div>}
    </div>
  );
}
type AddItemFormProps = {
  addItem: (title: string) => void;
};
