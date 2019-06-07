import * as assert from 'assert';
import {
  calculateWinner,
  getColorClass,
  getSquareClasses,
  getPlayerEmblemClasses,
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
  ].forEach(({ winner, squares }) => {
    it(`should declare ${winner} the winner when winner ${winner} has line of three`, () => {
      assert.strictEqual(calculateWinner(squares), winner);
    });
  });

  [
    { winner: 'X', squares: threeInRow(0, 'X') },
    { winner: 'X', squares: threeInRow(2, 'X') },
    { winner: 'O', squares: threeInRow(1, 'O') },
  ].forEach(({ winner, squares }) => {
    it(`should declare ${winner} the winner when winner ${winner} has row of three`, () => {
      assert.strictEqual(calculateWinner(squares), winner);
    });
  });

  [
    { winner: 'X', squares: threeInDiagonal('X') },
    { winner: 'O', squares: threeInDiagonal('O') },
    { winner: 'O', squares: threeInDiagonal('O', 'reverse') },
  ].forEach(({ winner, squares }) => {
    it(`should declare ${winner} the winner when winner ${winner} has diagonal of three`, () => {
      assert.strictEqual(calculateWinner(squares), winner);
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

describe('getColorClass', () => {
  it('should return nothing if board is active and not won', () => {
    const board = { squares: emptySquares(), isActive: true };
    assert.strictEqual(getColorClass(board), '');
  });

  it('should return "disabled-board" if board is not active and not won', () => {
    const board = { squares: emptySquares(), isActive: false };
    assert.equal(getColorClass(board), 'disabled-board');
  });

  it('should return "o-won-board" if board is won by O', () => {
    const inactiveBoard = { squares: oWinningSquares(), isActive: false };
    const activeBoard = { squares: oWinningSquares(), isActive: true };
    assert.equal(getColorClass(inactiveBoard), 'o-won-board');
    assert.equal(getColorClass(activeBoard), 'o-won-board');
  });

  it('should return "x-won-board" if board is won by X', () => {
    const inactiveBoard = { squares: xWinningSquares(), isActive: false };
    const activeBoard = { squares: xWinningSquares(), isActive: true };
    assert.equal(getColorClass(inactiveBoard), 'x-won-board');
    assert.equal(getColorClass(activeBoard), 'x-won-board');
  });
});

describe('getSquareClasses', () => {
  it('should just return square if given value of X or O and specialIcons false', () => {
    assert.equal(getSquareClasses({ value: 'X', specialIcons: false }), 'square');
    assert.equal(getSquareClasses({ value: 'O', specialIcons: false }), 'square');
  });

  it('should return square-vue-icon and square classes if given value of X and specialIcons true', () => {
    assert.equal(getSquareClasses({ value: 'X', specialIcons: true }), 'square-vue-icon square');
  });

  it('should return square-vue-icon and square classes if given value of X and specialIcons true', () => {
    assert.equal(getSquareClasses({ value: 'O', specialIcons: true }), 'square-react-icon square');
  });
});

describe('getPlayerEmblemClasses', () => {
  it('should return empty string if given value of X or O and specialIcons false', () => {
    assert.strictEqual(getPlayerEmblemClasses({ value: 'X', specialIcons: false }), 'no-icon');
    assert.strictEqual(getPlayerEmblemClasses({ value: 'O', specialIcons: false }), 'no-icon');
  });

  it('should return square-vue-icon and square classes if given value of X and specialIcons true', () => {
    assert.equal(getPlayerEmblemClasses({ value: 'X', specialIcons: true }), 'vue-icon');
  });

  it('should return square-vue-icon and square classes if given value of X and specialIcons true', () => {
    assert.equal(getPlayerEmblemClasses({ value: 'O', specialIcons: true }), 'react-icon');
  });
});

function oWinningSquares() {
  return ['O', null, null, 'O', null, null, 'O', null, null];
}

function xWinningSquares() {
  return ['X', null, null, 'X', null, null, 'X', null, null];
}

function emptySquares() {
  return Array(9).fill(null);
}
