import { FilterValueType } from "./App";

type ButtonPropsType = {
  title: string;
  onClickHandler?: () => void;
  isDisabled?: boolean;
};

export function Button({ title, onClickHandler, isDisabled }: ButtonPropsType) {
  return (
    <button onClick={onClickHandler} disabled={isDisabled}>
      {title}
    </button>
  );
}
