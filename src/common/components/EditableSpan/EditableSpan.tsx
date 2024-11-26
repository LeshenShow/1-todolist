import Input from "@mui/material/Input";
import { ChangeEvent, useState } from "react";

export function EditableSpan(props: Props) {
  const [editMode, setEditMode] = useState(false);
  const [itemTitle, setItemTitle] = useState(props.value);

  const onEditMode = () => {
    props.disabled || setEditMode(true);
  };
  const offEditMode = () => {
    props.onChange(itemTitle);
    setEditMode(false);
  };

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value);
  };
  return editMode ? (
    <Input
      autoFocus
      value={itemTitle}
      onBlur={offEditMode}
      onChange={changeItemTitleHandler}
      disabled={props.disabled}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{props.value}</span>
  );
}
type Props = {
  value: string;
  onChange: (newTitle: string) => void;
  disabled?: boolean;
};