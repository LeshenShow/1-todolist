import { GameInfo } from "../PetApp";

type ResultTableProps = {
  gameInfo: GameInfo;
};
export function ResultTable(props: ResultTableProps) {
  const tries = props.gameInfo.try;
  const result = props.gameInfo.result;
  const valueArray: number[] = [1, 2, 3, 4, 5, 6];
  const tableResults = valueArray.map((el, index) => {
    let sum = Math.round(
      (result.filter((value) => value === el).length / tries) * 100
    );
    return (
      <tr key={index}>
        <td>{el}</td>
        <td>{sum}%</td>
      </tr>
    );
  });
  return (
    <div className="resultTable">
      <table>
        <thead>
          <tr>
            <th>Значение</th>
            <th>% Выпадений</th>
          </tr>
        </thead>
        <tbody>{tableResults}</tbody>
      </table>
    </div>
  );
}
