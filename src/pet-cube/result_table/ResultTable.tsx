import { getResultTableScore } from "../MathLogic/getResultTableScore";
import { getMateExpect } from "../MathLogic/getMateExpect";
import { GameInfo } from "../PetApp";

type ResultTableProps = {
  result: number[];
};
export function ResultTable({ result }: ResultTableProps) {
  const valueArray: number[] = [1, 2, 3, 4, 5, 6];
  const mapValueArray = (el: number, index: number) => {
    const percent = getResultTableScore(result, el);
    const mateExpect = getMateExpect(percent);
    return (
      <tr key={index}>
        <td>{el}</td>
        <td>{percent}%</td>
        <td>{mateExpect}</td>
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
            <th>Мат. ожидание</th>
          </tr>
        </thead>
        <tbody>{tableResults}</tbody>
      </table>
    </div>
  );
}
