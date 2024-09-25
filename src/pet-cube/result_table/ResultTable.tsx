import { getResultTableScore } from "../MathLogic/getResultTableScore";
import { GameInfo } from "../PetApp";

type ResultTableProps = {
  gameInfo: GameInfo;
};
export function ResultTable(props: ResultTableProps) {
  const result = props.gameInfo.result;
  const valueArray: number[] = [1, 2, 3, 4, 5, 6];
  const mapValueArray = (el: number, index: number) => {
    const percent = getResultTableScore(result, el);
    return (
      <tr key={index}>
        <td>{el}</td>
        <td>{percent}%</td>
      </tr>
    );
  };

  const tableResults = valueArray.map(mapValueArray);
  return (
    <div className="resultTable">
      <table>
        <thead>
          <tr>
            <th>Значение</th>
            <th>Выпадений</th>
          </tr>
        </thead>
        <tbody>{tableResults}</tbody>
      </table>
    </div>
  );
}
