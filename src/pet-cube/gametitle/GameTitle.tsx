import { Button } from "../ui-components/Button";
import classNames from "classnames";
import { GameInfo } from "../PetApp";
import { GameTitleInfo } from "../ui-components/GameTitleInfo";
import { useState } from "react";

type GameTitleProps = {
  updateGameInfo: (chosen: number, bid: string) => void;
  gameInfo: GameInfo;
};
type BidAndChosen = {
  chosen: number;
  bid: string;
  bidArray: string[];
  valueArray: number[];
};
export function GameTitle(props: GameTitleProps) {
  const [bidAndChoose, setBidAndChoose] = useState<BidAndChosen>({
    bid: props.gameInfo.bid,
    chosen: props.gameInfo.chosen,
    valueArray: [1, 2, 3, 4, 5, 6],
    bidArray: ["1x", "5x", "10x"],
  });
  const updateChosen = (newChosen: number) => {
    if (bidAndChoose.chosen !== newChosen) {
      setBidAndChoose({ ...bidAndChoose, chosen: newChosen });
    }
  };
  const updateBid = (newBid: string) => {
    if (bidAndChoose.bid !== newBid) {
      setBidAndChoose({ ...bidAndChoose, bid: newBid });
    }
  };
  const updateGameInfoHandler = () => {
    props.updateGameInfo(bidAndChoose.chosen, bidAndChoose.bid);
  };
  const mapButtons = (el: number, i: number) => {
    const className = classNames(
      "chosenButton",
      el === bidAndChoose.chosen && "chosenButton-active"
    );
    return (
      <Button
        key={i}
        onClick={() => updateChosen(el)}
        value={el}
        title={el.toString()}
        className={className}
      />
    );
  };
  const buttons: JSX.Element[] = bidAndChoose.valueArray.map(mapButtons);
  const mapBidButtons = (el: string, i: number) => {
    const className = classNames(bidAndChoose.bid === el && "chosenBid");
    return (
      <Button
        key={i}
        title={el}
        onClick={() => {
          updateBid(el);
        }}
        className={className}
      />
    );
  };
  const bidButton = bidAndChoose.bidArray.map(mapBidButtons);
  return (
    <div className="gameTitle">
      <span>Загадай число от 1 до 6</span> {/* {hard code -------} */}
      <div>{buttons}</div>
      <GameTitleInfo title="Попыток: " value={props.gameInfo.try} />
      <GameTitleInfo title="Угадано: " value={props.gameInfo.guess} />
      <GameTitleInfo title="Очки: " value={props.gameInfo.score} />
      <GameTitleInfo title="Ставки" />
      <div>{bidButton}</div>
      <Button
        title={"GO!"}
        onClick={() => {
          updateGameInfoHandler();
        }}
      />
    </div>
  );
}
