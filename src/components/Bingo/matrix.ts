
const BASE_NUMBER = 15;
const ONE_SIDE_SIZE = 5;
const FREE_STRING = 'FREE';

const getCandidates = (loopIndex: number) => {

  const candidates: string[] = [];

  for (let i = 1; i <= BASE_NUMBER; i++) {
    candidates.push(String(i + loopIndex * BASE_NUMBER));
  }

  return candidates;
}

const transpose = (matrix: string[][]): string[][] => {

  const transposed: string[][] = [];

  for (let i = 0; i < matrix.length; i++) {

    const column: string[] = [];

    for (let j = 0; j < matrix[i].length; j++) {
      column.push(matrix[j][i]);
    }

    transposed.push(column);
  }

  return transposed;
}

export const createMatrix = (): string[][] => {

  const matrix: string[][] = [];

  for (let i = 0; i < ONE_SIDE_SIZE; i++) {

    const row: string[] = [];
    const candidates = getCandidates(i);

    for (let j = 0; j < ONE_SIDE_SIZE; j++) {
      const index = Math.floor(Math.random() * candidates.length);
      row.push(candidates.splice(index, 1)[0]);
    }

    matrix.push(row);
  }

  const centerIndex = Math.floor(ONE_SIDE_SIZE - 1) / 2;

  matrix[centerIndex][centerIndex] = FREE_STRING;

  return transpose(matrix);
}
