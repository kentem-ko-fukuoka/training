const BASE_NUMBER = 15;
const ONE_SIDE_SIZE = 5;
const FREE_STRING = 'FREE';

const getSelections = (loopIndex: number) => {

  const selections: string[] = [];

  for (let i = 1; i <= BASE_NUMBER; i++) {
    selections.push((i + loopIndex * BASE_NUMBER).toString());
  }

  return selections;
}

const transpose = (matrix: string[][]): string[][] => {

  const transposed: string[][] = [];

  matrix.forEach((row) => {

    const column: string[] = [];

    row.forEach((element) => {
      column.push(element);
    })

    transposed.push(column);
  });

  return transposed;
}

export const createMatrix = (): string[][] => {

  const matrix: string[][] = [];

  for (let i = 0; i < ONE_SIDE_SIZE; i++) {

    const row: string[] = [];
    const selections = getSelections(i);

    for (let j = 0; j < ONE_SIDE_SIZE; j++) {
      const index = Math.floor(Math.random() * selections.length);
      row.push(selections.splice(index, 1)[0]);
    }

    matrix.push(row);
  }

  const centerIndex = Math.floor(ONE_SIDE_SIZE - 1) / 2;

  matrix[centerIndex][centerIndex] = FREE_STRING;

  return transpose(matrix);
}
