import { useState } from "react";
import "./Cube.css";
import { CubeArea } from "./cubearea/CubeArea";
import { GameTitle } from "./gametitle/GameTitle";
import { ResultTable } from "./result_table/ResultTable";

export function PetApp() {
  const [choose, setChoose] = useState<number>(0);
  const onClickHandler = (choosen: number) => {
    setChoose(choosen);
  };
  return (
    <div>
      <GameTitle onClickHandler={onClickHandler} choose={choose} />
      <CubeArea choose={choose} />
      <ResultTable />
    </div>
  );
}
