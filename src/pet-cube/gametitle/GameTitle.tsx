import { useState } from "react";
import { Button } from "./Button";
import classNames from "classnames";
import { GameInfo } from "../PetApp";

type GameTitleProps = {
  setNewChosen: (newChosen: number) => void;
  gameInfo: GameInfo;
};

export function GameTitle(props: GameTitleProps) {
  const setNewChosenHandler = (newChosen: number) => {
    props.setNewChosen(newChosen);
  };
  const valueArray: number[] = [1, 2, 3, 4, 5, 6]; // hard code---------------------------------
  const buttons: JSX.Element[] = valueArray.map((el, i) => {
    const className = classNames(
      "chosenButton",
      el === props.gameInfo.chosen && "chosenButton-active"
    );
    return (
      <Button
        key={i}
        onClick={() => setNewChosenHandler(el)}
        value={el}
        className={className}
      />
    );
  });
  return (
    <div className="gameTitle">
      <div>
        <span>Загадай число от 1 до 6</span> {/* {hard code -------} */}
        <div>{buttons}</div>
      </div>
      <div>
        <div>
          <span>Попыток: </span>
          <span>{props.gameInfo.try}</span>
        </div>
        <div>
          <span>Угадано: </span>
          <span>{props.gameInfo.guess}</span>
        </div>
      </div>

      {/* <button onClick={() => {setTest([1]);}}>TEST</button> */}
    </div>
  );
}
