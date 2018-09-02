import * as assert from 'assert';
import { calculateWinner, markInactiveBoards } from '../src/helpers';

describe('calculateWinner', () => {
  const initialSquares = Array(9).fill(null);

  it('should return null when given initial empty squares', () => {
    assert.strictEqual(calculateWinner(initialSquares), null);
  });

  it('should return null when only two in horizontal line for any given player', () => {
    assert.strictEqual(calculateWinner(squaresWithLine(0, ['X', 'X', 'O'])), null);
    assert.strictEqual(calculateWinner(squaresWithLine(0, [null, 'X', 'X'])), null);
    assert.strictEqual(calculateWinner(squaresWithLine(1, ['X', '0', 'O'])), null);
    assert.strictEqual(calculateWinner(squaresWithLine(2, ['0', null, 'O'])), null);
  });

  [
    { winner: 'X', squares: threeInLine(0, 'X') },
    { winner: 'X', squares: threeInLine(2, 'X') },
    { winner: 'O', squares: threeInLine(1, 'O') },
  ].forEach((fixture) => {
    it(`should declare ${fixture.winner} the winner when winner ${fixture.winner} has line of three`, () => {
      assert.strictEqual(calculateWinner(fixture.squares), fixture.winner);
    });
  });

  [
    { winner: 'X', squares: threeInRow(0, 'X') },
    { winner: 'X', squares: threeInRow(2, 'X') },
    { winner: 'O', squares: threeInRow(1, 'O') },
  ].forEach((fixture) => {
    it(`should declare ${fixture.winner} the winner when winner ${fixture.winner} has row of three`, () => {
      assert.strictEqual(calculateWinner(fixture.squares), fixture.winner);
    });
  });

  [
    { winner: 'X', squares: threeInDiagonal('X') },
    { winner: 'O', squares: threeInDiagonal('O') },
    { winner: 'O', squares: threeInDiagonal('O', 'reverse') },
  ].forEach((fixture) => {
    it(`should declare ${fixture.winner} the winner when winner ${fixture.winner} has diagonal of three`, () => {
      assert.strictEqual(calculateWinner(fixture.squares), fixture.winner);
    });
  });

  it('should throw error for invalid squares configuration');

  function threeInLine(line, squareValue) {
    return squaresWithLine(line, Array(3).fill(squareValue));
  }

  function threeInRow(row, squareValue) {
    return squaresWithRow(row, Array(3).fill(squareValue));
  }

  function threeInDiagonal(squareValue, diagonal) {
    const newSquares = initialSquares.slice();
    if (diagonal === 'reverse') {
      newSquares[2] = squareValue;
      newSquares[4] = squareValue;
      newSquares[6] = squareValue;
    } else {
      newSquares[0] = squareValue;
      newSquares[4] = squareValue;
      newSquares[8] = squareValue;
    }

    return newSquares;
  }

  function squaresWithLine(line, lineSquares) {
    if (line < 0 || line > 2) {
      throw new TypeError();
    }
    const newSquares = initialSquares.slice();
    const startingSquare = line * 3;
    [
      newSquares[startingSquare + 0],
      newSquares[startingSquare + 1],
      newSquares[startingSquare + 2],
    ] = lineSquares;

    return newSquares;
  }

  function squaresWithRow(row, rowSquares) {
    if (row < 0 || row > 2) {
      throw new TypeError();
    }
    const newSquares = initialSquares.slice();
    const startingSquare = row;
    [
      newSquares[startingSquare + 0],
      newSquares[startingSquare + 3],
      newSquares[startingSquare + 6],
    ] = rowSquares;

    return newSquares;
  }
});

describe('Ultimate tic-tac-toe: markInactiveBoards', () => {
  it('should mark all boards inactive except one with given squareIndex', () => {
    const boards = Array(9).fill().map(() => ({ isActive: true }));

    const markedBoards = markInactiveBoards(boards, 5);

    assert.strictEqual(markedBoards[5].isActive, true);
    markedBoards
      .filter((board, index) => index !== 5)
      .map((board, index) => assert.strictEqual(board.isActive, false, `Board with index ${index} should not be active`));
  });

  it('should activate board with given squareIndex if it was inactive', () => {
    const boards = Array(9).fill().map(() => ({ isActive: false }));

    const markedBoards = markInactiveBoards(boards, 2);

    assert.strictEqual(markedBoards[2].isActive, true, 'Board on given squareIndex must be active');
    markedBoards
      .filter((board, index) => index !== 2)
      .map((board, index) => assert.strictEqual(board.isActive, false, `Board with index ${index} should not be active`));
  });

  it('if board that should be active was won, mark it inactive and all others active');
  it('if board that should be active was won, mark it inactive and all others not also won active');
});
