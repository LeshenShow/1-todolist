import { useState } from "react";
import "./Cube.css";
import { CubeArea } from "./cubearea/CubeArea";
import { GameTitle } from "./gametitle/GameTitle";
import { ResultTable } from "./result_table/ResultTable";
import { createRandomInt } from "./MathLogic/createRandomInt";
import { getNewScore } from "./MathLogic/getNewScore";

export type GameInfo = {
  chosen: number;
  wish: number;
  try: number;
  guess: number;
  result: number[];
  score: number;
  bid: string;
};
export function PetApp() {
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    chosen: 1,
    wish: 0,
    try: 0, // result.length
    guess: 0,
    result: [],
    score: 250,
    bid: "1x",
  });

  const updateGameInfo = (chosen: number, bid: string) => {
    const newWish = createRandomInt();
    const isWinner = gameInfo.chosen === newWish;
    const newGuess = isWinner ? gameInfo.guess + 1 : gameInfo.guess;
    const newScore = getNewScore(gameInfo.bid, gameInfo.score, isWinner);
    setGameInfo({
      ...gameInfo,
      wish: newWish,
      try: gameInfo.try + 1,
      guess: newGuess,
      result: [...gameInfo.result, newWish],
      score: newScore,
      chosen: chosen,
      bid: bid,
    });
    console.log(gameInfo);
  };
  return (
    <div>
      <GameTitle gameInfo={gameInfo} updateGameInfo={updateGameInfo} />
      <CubeArea gameInfo={gameInfo} />
      <ResultTable gameInfo={gameInfo} />
    </div>
  );
}
