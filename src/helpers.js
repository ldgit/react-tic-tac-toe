export default function calculateWinner(squares) {
  for (let i = 0; i < 3; i += 1) {
    const startingLine = i * 3;
    const line = squares.slice(startingLine, startingLine + 3);

    if (line.every(value => value === 'X')) {
      return 'X';
    }
    if (line.every(value => value === 'O')) {
      return 'O';
    }
  }

  for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
    const row = squares.filter((value, index) => index % 3 === rowIndex);
    if (row.every(value => value === 'X')) {
      return 'X';
    }
    if (row.every(value => value === 'O')) {
      return 'O';
    }
  }

  return null;
}
