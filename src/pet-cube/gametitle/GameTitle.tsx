import { ChooseButton } from "./ChooseButton";

type GameTitleProps = {
  onClickHandler: (choosen: number) => void;
  choose: number;
};
export function GameTitle(props: GameTitleProps) {
  const valueArray: number[] = [1, 2, 3, 4, 5, 6];
  const buttons: JSX.Element[] = valueArray.map((el, i) => {
    return (
      <ChooseButton
        key={i}
        onClickHandler={props.onClickHandler}
        value={el}
        active={el === props.choose ? "chooseButton-active" : ""}
      />
    );
  });
  return (
    <div className="gameTitle">
      <div>
        <span>Загадай число от 1 до 6</span>
      </div>

      <div>{buttons}</div>

      <div>
        <button onClick={() => {}}>
          <span>Старт</span>
        </button>
      </div>
    </div>
  );
}
