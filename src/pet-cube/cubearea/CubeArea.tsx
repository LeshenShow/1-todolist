import { useState } from "react";
import { CubeElement } from "./CubeElement";
import classNames from "classnames";
import { GameInfo } from "../PetApp";

type PositionProps = {
  id: number;
  position: number[];
};
type CubeAreaProps = {
  gameInfo: GameInfo;
};
export function CubeArea(props: CubeAreaProps) {
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
    const className = {
      active: el.position.includes(props.gameInfo.wish),
      isWinner:
        props.gameInfo.chosen === props.gameInfo.wish &&
        props.gameInfo.chosen !== 0,
    };
    return <CubeElement key={index} id={el.id} className={className} />;
  });
  return <div className="cubeArea">{cubeElements}</div>;
}
