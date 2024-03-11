import styled from "styled-components";
import { createMatrix } from "../matrix";

const BingoBody = () => {

  const matrix = createMatrix();

  const trs = matrix.map((row, index) => {
    return (
      <tr key={index}>
        {row.map((element, index) => {
          return (
            <StyledTd key={index}>{element}</StyledTd>
          );
        })}
      </tr>
    );
  })

  return (
    <tbody>
      {trs}
    </tbody>
  );
}

export default BingoBody;

const StyledTd = styled.td({
  backgroundColor: 'pink',
  width: '40px',
  height: '40px'
});
