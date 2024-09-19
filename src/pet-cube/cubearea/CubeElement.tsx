import classNames from "classnames";

type CubeElementProps = {
  id: number;
  active: boolean;
  position: number[];
};

export function CubeElement(props: CubeElementProps) {
  return (
    <div className={classNames(`cubeElement`)}>
      {props.active ? <div className="cubeElement-active" /> : <></>}
    </div>
  );
}
