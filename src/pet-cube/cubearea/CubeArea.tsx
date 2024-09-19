import { useState } from "react";
import { CubeElement } from "./CubeElement";

type PositionProps = {
  id: number;
  position: number[];
};
type CubeAreaProps = {
  choose: number;
};
export function CubeArea(props: CubeAreaProps) {
  const wish: number = Math.round(Math.random() * (6 - 1) + 1);
  const choose = props.choose;
  if (choose === wish) {
    console.log(true);
  }
  const [gameArea, setGameArea] = useState<Array<PositionProps>>([
    { id: 1, position: [3, 5, 6] },
    { id: 2, position: [4] },
    { id: 3, position: [2, 5, 6] },
    { id: 4, position: [4, 6] },
    { id: 5, position: [1, 3, 5] },
    { id: 6, position: [4, 6] },
    { id: 7, position: [2, 5, 6] },
    { id: 8, position: [4] },
    { id: 9, position: [3, 5, 6] },
  ]);

  const cubeElements = gameArea.map((el, index) => {
    return (
      <CubeElement
        key={index}
        id={el.id}
        active={el.position.includes(wish) && true}
        position={el.position}
      />
    );
  });
  return <div className="cubeArea">{cubeElements}</div>;
}
