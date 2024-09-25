export {};
// import { Button } from "../ui-components/Button";
// import classNames from "classnames";
// import { GameInfo } from "../PetApp";
// import { GameTitleInfo } from "../ui-components/GameTitleInfo";
// import { BidArea } from "./BidArea";
// import { useState } from "react";

// type GameTitleProps = {
//   updateChosen: (newChosen: number) => void;
//   updateBid: (newBid: string) => void;
//   updateGameInfo: () => void;
//   gameInfo: GameInfo;
// };

// export function GameTitle(props: GameTitleProps) {
//   const [bidAndChoose, setbidAndChoose] = useState<{}>({
//     bid: props.gameInfo.bid,
//     chosen: props.gameInfo.chosen,
//   });
//   const updateChosenHandler = (newChosen: number) => {
//     props.updateChosen(newChosen);
//   };
//   const updateBidHandler = (newBid: string) => {
//     props.updateBid(newBid);
//   };

//   const valueArray: number[] = [1, 2, 3, 4, 5, 6]; // hard code---------------------------------
//   const mapButtons = (el: number, i: number) => {
//     const className = classNames(
//       "chosenButton",
//       el === props.gameInfo.chosen && "chosenButton-active"
//     );
//     return (
//       <Button
//         key={i}
//         onClick={() => updateChosenHandler(el)}
//         value={el}
//         title={el.toString()}
//         className={className}
//       />
//     );
//   };
//   const buttons: JSX.Element[] = valueArray.map(mapButtons);

//   return (
//     <div className="gameTitle">
//       <span>Загадай число от 1 до 6</span> {/* {hard code -------} */}
//       <div>{buttons}</div>
//       <div>
//         <GameTitleInfo title="Попыток: " value={props.gameInfo.try} />
//         <GameTitleInfo title="Угадано: " value={props.gameInfo.guess} />
//         <GameTitleInfo title="Очки: " value={props.gameInfo.score} />
//       </div>
//       <BidArea
//         updateBidHandler={updateBidHandler}
//         currentBid={props.gameInfo.bid}
//       />
//       <Button
//         title={"GO!"}
//         onClick={() => {
//           props.updateGameInfo();
//         }}
//       />
//     </div>
//   );
// }
