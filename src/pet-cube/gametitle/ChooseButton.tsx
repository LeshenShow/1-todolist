import classNames from "classnames";

type ChooseButtonProps = {
  onClickHandler: (choosen: number) => void;
  value: number;
  title?: string;
  active?: string | undefined;
};

export function ChooseButton(props: ChooseButtonProps) {
  return (
    <button
      className={classNames(`chooseButton`, props.active)}
      onClick={() => {
        props.onClickHandler(props.value);
      }}
    >
      <span>{props.value}</span>
    </button>
  );
}
