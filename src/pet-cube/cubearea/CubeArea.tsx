import { useState } from "react";
import { CubeElement } from "./CubeElement";
import { GameInfo } from "../PetApp";

type PositionProps = {
  id: number;
  position: number[];
};
type CubeAreaProps = {
  wish: number;
  choose: number;
};
export function CubeArea({ wish, choose }: CubeAreaProps) {
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
  const mapGameArea = (
    el: { id: number; position: number[] },
    index: number
  ) => {
    const className = {
      active: el.position.includes(wish),
      isWinner: choose === wish && choose !== 0,
    };
    return <CubeElement key={index} id={el.id} className={className} />;
  };
  const cubeElements = gameArea.map(mapGameArea);

  return <div className="cubeArea">{cubeElements}</div>;
}
