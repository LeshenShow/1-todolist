import classNames from "classnames";

type CubeElementProps = {
  id: number;
  className: {
    active: boolean;
    isWinner: boolean;
  };
};

export function CubeElement(props: CubeElementProps) {
  const className = classNames(
    "cubeElement",
    props.className.isWinner && "cubeElement-winner"
  );
  return (
    <div className={className}>
      {props.className.active && <div className="circleElement-active" />}
    </div>
  );
}
