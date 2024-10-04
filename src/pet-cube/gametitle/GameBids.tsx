import classNames from "classnames";
import { GameBid } from "./GameTitle";
import { Button } from "../ui-components/Button";

type GameBidsProps = {
  updateGameBid: (newBid: string) => void;
  gameBid: GameBid;
};
export function GameBids(props: GameBidsProps) {
  const mapGameBids = (el: string, i: number) => {
    const className = classNames(
      "gameBid",
      props.gameBid.bid === el && "chosenGameBid"
    );
    return (
      <Button
        key={i}
        title={el}
        onClick={() => props.updateGameBid(el)}
        className={className}
      />
    );
  };
  const gameBids = props.gameBid.bidArray.map(mapGameBids);
  return <div>{gameBids}</div>;
}
