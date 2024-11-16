import Input from "@mui/material/Input";
import { ChangeEvent, useState } from "react";
type EditableSpanProps = {
  value: string;
  onChange: (newTitle: string) => void;
};
export function EditableSpan(props: EditableSpanProps) {
  const [editMode, setEditMode] = useState(false);
  const [itemTitle, setItemTitle] = useState(props.value);

  const onEditMode = () => {
    setEditMode(true);
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
    />
  ) : (
    <span onDoubleClick={onEditMode}>{props.value}</span>
  );
}
