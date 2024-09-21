import { useState } from "react";
import "./Cube.css";
import { CubeArea } from "./cubearea/CubeArea";
import { GameTitle } from "./gametitle/GameTitle";
import { ResultTable } from "./result_table/ResultTable";
import { createRandomInt } from "./MathLogic/createRandomInt";

export type GameInfo = {
  chosen: number;
  wish: number;
  try: number;
  guess: number;
  result: number[];
};
export function PetApp() {
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    chosen: 0,
    wish: 0,
    try: 0,
    guess: 0,
    result: [0],
  });

  const setNewChosen = (newChosen: number) => {
    const newWish = createRandomInt();
    const newGuess =
      newChosen !== newWish ? gameInfo.guess : gameInfo.guess + 1;
    setGameInfo({
      chosen: newChosen,
      wish: newWish,
      try: gameInfo.try + 1,
      guess: newGuess,
      result: [...gameInfo.result, newWish],
    });
  };

  return (
    <div>
      <GameTitle setNewChosen={setNewChosen} gameInfo={gameInfo} />
      <CubeArea gameInfo={gameInfo} />
      <ResultTable gameInfo={gameInfo} />
    </div>
  );
}
