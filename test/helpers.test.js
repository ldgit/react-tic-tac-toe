import * as assert from 'assert';
import {
  calculateWinner,
  markInactiveAndInactiveBoards,
  calculateUltimateWinner,
  getColorClass,
} from '../src/helpers';

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

describe('Ultimate tic-tac-toe: markInactiveAndInactiveBoards', () => {
  it('should mark all boards inactive except one that is next to play', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: true }));

    const markedBoards = markInactiveAndInactiveBoards(boards, 5);

    assert.strictEqual(markedBoards[5].isActive, true);
    markedBoards
      .filter((board, index) => index !== 5)
      .map((board, index) => assert.strictEqual(board.isActive, false, `Board with index ${index} should not be active`));
  });

  it('should activate board that should be played next if it was inactive', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));

    const markedBoards = markInactiveAndInactiveBoards(boards, 2);

    assert.strictEqual(markedBoards[2].isActive, true, 'Board that should be played next must be active');
    markedBoards
      .filter((board, index) => index !== 2)
      .map((board, index) => assert.strictEqual(board.isActive, false, `Board with index ${index} should not be active`));
  });

  it('if board that should should be next to play was won, mark it inactive and all others active', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    const wonBoard = ['O', 'O', 'O', ...Array(6).fill(null)];
    boards[6].squares = wonBoard;

    const markedBoards = markInactiveAndInactiveBoards(boards, 6);

    assert.strictEqual(markedBoards[6].isActive, false, 'Won board must not be active');
    assert.deepEqual(markedBoards[6].squares, boards[6].squares, 'Board 6 squares must be preserved');
    markedBoards
      .filter((board, index) => index !== 6)
      .map(board => assert.strictEqual(board.isActive, true, 'Every board except board 6 must be active'));
  });

  it('if board that should be next to play was won, mark it and other won boards as inactive, and the rest active', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[1].squares = ['O', 'O', 'O', ...Array(6).fill(null)];
    boards[3].squares = [...Array(6).fill(null), 'X', 'X', 'X'];

    const markedBoards = markInactiveAndInactiveBoards(boards, 3);

    assert.strictEqual(markedBoards[3].isActive, false, 'Won board 3 must not be active');
    assert.deepEqual(markedBoards[3].squares, boards[3].squares, 'Board 3 squares must be preserved');
    assert.strictEqual(markedBoards[1].isActive, false, 'Won board 1 must not be active');
    assert.deepEqual(markedBoards[1].squares, boards[1].squares, 'Board 1 squares must be preserved');
    markedBoards
      .filter((board, index) => ![1, 3].includes(index))
      .map(board => assert.strictEqual(board.isActive, true, 'Every board except boards 1 and 3 must be active'));
  });

  it('if boards that were won are not the one that should be next to play, mark next to play one as active, and the rest inactive', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[1].squares = ['O', 'O', 'O', ...Array(6).fill(null)];
    boards[3].squares = [...Array(6).fill(null), 'X', 'X', 'X'];

    const markedBoards = markInactiveAndInactiveBoards(boards, 8);

    assert.strictEqual(markedBoards[8].isActive, true, 'Board 8 was not won and therefore must be active');
    markedBoards
      .filter((board, index) => ![8].includes(index))
      .map(board => assert.strictEqual(board.isActive, false, 'Every board except boards 8 must be inactive'));
  });
});

describe('calculateUltimateWinner', () => {
  it('should return null for initial empty boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    assert.strictEqual(calculateUltimateWinner(boards), null);
  });

  it('should return null if ony two boards won', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[1].squares = ['O', 'O', 'O', ...Array(6).fill(null)];
    boards[3].squares = [...Array(6).fill(null), 'O', 'O', 'O'];

    assert.strictEqual(calculateUltimateWinner(boards), null);
  });

  it('should return null if top row of boards won, but by different players', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['X', 'X', 'X', ...Array(6).fill(null)];
    boards[1].squares = [...Array(6).fill(null), 'O', 'O', 'O'];
    boards[2].squares = ['X', null, null, null, 'X', null, null, null, 'X'];

    assert.strictEqual(calculateUltimateWinner(boards), null);
  });

  it('should return X if X won top row of boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['X', 'X', 'X', ...Array(6).fill(null)];
    boards[1].squares = [...Array(6).fill(null), 'X', 'X', 'X'];
    boards[2].squares = ['X', null, null, null, 'X', null, null, null, 'X'];

    assert.strictEqual(calculateUltimateWinner(boards), 'X');
  });

  it('should return O if O won left column of boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['O', null, null, 'O', null, null, 'O', null, null];
    boards[3].squares = [null, null, 'O', null, 'O', null, 'O', null, null];
    boards[6].squares = [null, 'O', null, null, 'O', null, null, 'O', null];

    assert.strictEqual(calculateUltimateWinner(boards), 'O');
  });

  it('should return X if X won diagonal boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['X', null, null, 'X', null, null, 'X', null, null];
    boards[4].squares = [null, null, 'X', null, 'X', null, 'X', null, null];
    boards[8].squares = [null, 'X', null, null, 'X', null, null, 'X', null];

    assert.strictEqual(calculateUltimateWinner(boards), 'X');
  });

  it('should return O if O won reverse diagonal boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[2].squares = ['O', null, null, 'O', null, null, 'O', null, null];
    boards[4].squares = [null, null, 'O', null, 'O', null, 'O', null, null];
    boards[6].squares = [null, 'O', null, null, 'O', null, null, 'O', null];

    assert.strictEqual(calculateUltimateWinner(boards), 'O');
  });
});

describe('getColorClass', () => {
  it('should return nothing if board is active and not won', () => {
    const board = { squares: emptySquares(), isActive: true };
    assert.strictEqual(getColorClass(board), '');
  });

  it('should return "lightred-board" if board is not active and not won', () => {
    const board = { squares: emptySquares(), isActive: false };
    assert.strictEqual(getColorClass(board), 'lightred-board');
  });

  it('should return "lightgreen-board" if board is won', () => {
    const inactiveBoard = { squares: winningSquares(), isActive: false };
    const activeBoard = { squares: winningSquares(), isActive: true };
    assert.strictEqual(getColorClass(inactiveBoard), 'lightgreen-board');
    assert.strictEqual(getColorClass(activeBoard), 'lightgreen-board');
  });
});

function winningSquares() {
  return ['O', null, null, 'O', null, null, 'O', null, null];
}

function emptySquares() {
  return Array(9).fill(null);
}
