import { ChangeEvent, useState } from "react";
import Input from "@mui/material/Input";
type EditableSpanProps = {
  title: string;
  changeTitle: (newTitle: string) => void;
};
export function EditableSpan(props: EditableSpanProps) {
  const [editMode, setEditMode] = useState(false);
  const [itemTitle, setItemTitle] = useState(props.title);

  const onEditMode = () => {
    setEditMode(true);
  };
  const offEditMode = () => {
    props.changeTitle(itemTitle);
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
    <span onDoubleClick={onEditMode}>{props.title}</span>
  );
}
