import classNames from "classnames";

type ButtonProps = {
  onClick: () => void;
  value?: number;
  title: string;
  className?: string;
};

export function Button(props: ButtonProps) {
  return (
    <button className={props.className} onClick={props.onClick}>
      <span>{props.title}</span>
    </button>
  );
}
