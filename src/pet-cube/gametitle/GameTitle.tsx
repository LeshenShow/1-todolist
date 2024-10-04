import { useState } from "react";
import { GameInfo } from "../PetApp";
import { Button } from "../ui-components/Button";
import { GameTitleInfo } from "../ui-components/GameTitleInfo";
import { GameBids } from "./GameBids";
import { GameNumbers } from "./GameNumbers";

type GameTitleProps = {
  updateGameInfo: (chosen: number, bid: string) => void;
  gameInfo: GameInfo;
};
export type GameNumber = {
  chosen: number;
  numberArray: number[];
};
export type GameBid = {
  bid: string;
  bidArray: string[];
};
export function GameTitle(props: GameTitleProps) {
  const [gameNumber, setGameNumber] = useState<GameNumber>({
    chosen: props.gameInfo.choose,
    numberArray: [1, 2, 3, 4, 5, 6],
  });
  const updateGameNumber = (newChosen: number) => {
    gameNumber.chosen !== newChosen &&
      setGameNumber({ ...gameNumber, chosen: newChosen });
  };

  const [gameBid, setGameBid] = useState<GameBid>({
    bidArray: ["1x", "5x", "10x"],
    bid: props.gameInfo.bid,
  });
  const updateGameBid = (newBid: string) => {
    gameBid.bid !== newBid && setGameBid({ ...gameBid, bid: newBid });
  };

  const updateGameInfoHandler = () => {
    props.updateGameInfo(gameNumber.chosen, gameBid.bid);
  };

  return (
    <div className="gameTitle">
      <span>Загадай число от 1 до 6</span> {/* {hard code -------} */}
      <GameNumbers
        gameNumber={gameNumber}
        updateGameNumber={updateGameNumber}
      />
      <GameTitleInfo title={"Попыток: "} value={props.gameInfo.try} />
      <GameTitleInfo title={"Угадано: "} value={props.gameInfo.guess} />
      <GameTitleInfo title={"Очки: "} value={props.gameInfo.score} />
      <GameTitleInfo title="Ставки" />
      <GameBids gameBid={gameBid} updateGameBid={updateGameBid} />
      <Button
        title={"GO!"}
        onClick={() => {
          updateGameInfoHandler();
        }}
      />
    </div>
  );
}
