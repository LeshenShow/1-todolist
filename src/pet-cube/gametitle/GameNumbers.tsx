import classNames from "classnames";
import { GameNumber } from "./GameTitle";
import { Button } from "../ui-components/Button";

type GameNumbersProps = {
  updateGameNumber: (newChosen: number) => void;
  gameNumber: GameNumber;
};
export function GameNumbers(props: GameNumbersProps) {
  const mapGameNumber = (el: number, i: number) => {
    const className = classNames(
      "gameNumber",
      el === props.gameNumber.chosen && "chosenGameNumber"
    );
    return (
      <Button
        key={i}
        onClick={() => props.updateGameNumber(el)}
        value={el}
        title={el.toString()}
        className={className}
      />
    );
  };
  const gameNumbers = props.gameNumber.numberArray.map(mapGameNumber);
  return <div>{gameNumbers}</div>;
}
