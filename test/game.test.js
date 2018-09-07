import assert from 'assert';
import { expect } from 'chai';
import Ultimate from '../src/game';

describe('Ultimate.playSquare', () => {
  let initialState;

  beforeEach(() => {
    initialState = Ultimate.getInitialState();
  });

  ['0', 0].forEach((squareIndex) => {
    it(`playing a square on initial board should advance to next player (square${JSON.stringify(squareIndex)})`, () => {
      const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex });
      assert.equal(newState.nextPlayer, 'O');
    });

    it(`playing a square on initial board should mark that square as played by current player (square ${JSON.stringify(squareIndex)})`, () => {
      const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex });
      assert.deepEqual(newState.boards[0].squares, ['X', ...Array(8).fill(null)]);
    });
  });

  it('changing board squares of new state should not alter previous state (immutability)', () => {
    const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 0 });

    expect(initialState.boards[0].squares[0]).to.be.equal(null, 'played square was modified in the initial state');

    assert.notDeepEqual(initialState.boards, newState.boards, 'old boards array changed');
    assertImutability(initialState, newState);
  });


  it('second move should correctly update next player', () => {
    const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = Ultimate.playSquare(newState, { boardIndex: 0, squareIndex: 4 });
    assert.equal(finalState.nextPlayer, 'X');
  });

  it('second move should mark that square as played by first player', () => {
    const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = Ultimate.playSquare(newState, { boardIndex: 0, squareIndex: 4 });
    assert.equal(finalState.boards[0].squares[4], 'O');
    assert.equal(finalState.boards[0].squares[0], 'X', 'First move not lost');
  });

  [0, 1, 3, 8, '2', '7'].forEach((squareIndex) => {
    it(`a move marks all boards except one that must be played next as inactive (squareIndex: ${JSON.stringify(squareIndex)})`, () => {
      const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex });
      assert.strictEqual(newState.boards[squareIndex].isActive, true, `board ${squareIndex} must be active`);
      newState.boards
        .filter((board, index) => index !== parseInt(squareIndex, 10))
        .forEach(board => assert.strictEqual(board.isActive, false, `board ${squareIndex} must be inactive`));
    });
  });

  it('move played on inactive board square does nothing (next player is sent to board in relative location to played square)', () => {
    const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = Ultimate.playSquare(newState, { boardIndex: 1, squareIndex: 4 });
    expect(finalState.boards[1].squares[4]).to.be.equal(null);

    assert.deepEqual(newState, finalState);
    assertImutability(newState, finalState);
  });

  [
    { move: { boardIndex: 6, squareIndex: 5 }, description: 'empty square', squareContent: null },
    { move: { boardIndex: 6, squareIndex: 1 }, description: 'occupied square', squareContent: 'X' },
  ].forEach(({ description, move, squareContent }) => {
    it(`move played on won board does nothing (${description})`, () => {
      initialState.boards[6].squares = [...Array(3).fill('X'), ...Array(6).fill(null)];
      initialState.boards[5].isActive = false;
      initialState.boards[4].isActive = true;
      const newState = Ultimate.playSquare(initialState, move);

      expect(newState.boards[move.boardIndex].squares[move.squareIndex]).to.be.equal(squareContent);
      assert.deepEqual(newState, initialState);
      assertImutability(newState, initialState);
    });
  });

  it('playing the same square twice will not advance to next player', () => {
    const midState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = Ultimate.playSquare(midState, { boardIndex: 0, squareIndex: 0 });
    assert.equal(finalState.nextPlayer, 'O');

    assert.notDeepEqual(initialState.boards, finalState.boards, 'old boards array changed');
    assertImutability(finalState, initialState);
  });

  it('playing the same square twice will not change the value of that square', () => {
    const midState = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: 1 });
    const finalState = Ultimate.playSquare(midState, { boardIndex: 1, squareIndex: 1 });
    assert.equal(finalState.boards[1].squares[1], 'X', 'O played on square occupied by X');
    assert.equal(finalState.nextPlayer, 'O');

    const stateOne = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 4 });
    const stateTwo = Ultimate.playSquare(stateOne, { boardIndex: 4, squareIndex: 0 });
    const stateThree = Ultimate.playSquare(stateTwo, { boardIndex: 0, squareIndex: 4 });
    assert.equal(stateThree.boards[0].squares[4], 'X', 'X played on square occupied by X');
    assert.equal(stateThree.nextPlayer, 'X');
  });

  [
    { move: { boardIndex: 6, squareIndex: 5 }, description: 'empty square', squareContent: null },
    { move: { boardIndex: 0, squareIndex: 0 }, description: 'occupied square', squareContent: 'X' },
  ].forEach(({ move, description, squareContent }) => {
    it(`new moves do nothing if game won ${description}`, () => {
      initialState.boards[0].squares = [...Array(3).fill('X'), ...Array(6).fill(null)];
      initialState.boards[4].squares = [...Array(6).fill(null), ...Array(3).fill('X')];
      initialState.boards[8].squares = ['X', null, null, null, 'X', null, null, null, 'X'];

      const newState = Ultimate.playSquare(initialState, move);

      expect(newState.boards[move.boardIndex].squares[move.squareIndex]).to.be.equal(squareContent);
      assert.deepEqual(newState, initialState);
      assertImutability(initialState, newState);
    });
  });

  [4, '4'].forEach((squareIndex) => {
    it(`clicking on an empty square on inactive board does not change boards isActive status (${JSON.stringify(squareIndex)})`, () => {
      const indexOfBoardThatMustRemainActive = 6;
      const newState = Ultimate.playSquare(initialState, {
        boardIndex: 0,
        squareIndex: indexOfBoardThatMustRemainActive,
      });
      const finalState = Ultimate.playSquare(newState, { boardIndex: 1, squareIndex });

      assert.strictEqual(finalState.boards[indexOfBoardThatMustRemainActive].isActive, true, `board ${indexOfBoardThatMustRemainActive} must be active`);
      getBoardsExcept(finalState.boards, [indexOfBoardThatMustRemainActive]).forEach((board, boardIndex) => {
        assert.strictEqual(board.isActive, false, `board ${boardIndex} must be inactive`);
      });

      assertImutability(newState, finalState);
      assertImutability(initialState, finalState);
    });
  });

  it('playing an occupied square on inactive board does nothing', () => {
    const midState = Ultimate.playSquare(initialState, { boardIndex: 8, squareIndex: '4' });
    const finalState = Ultimate.playSquare(midState, { boardIndex: 8, squareIndex: '4' });

    assert.deepEqual(finalState, midState);
  });

  it('if move takes the player to won board, mark all boards as active (covers case where move that takes the player to won board is also the one that won that board)', () => {
    const firstXMoveState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 8 });
    const firstOMoveState = Ultimate.playSquare(firstXMoveState, { boardIndex: 8, squareIndex: 0 });
    const secondXMoveState = Ultimate.playSquare(firstOMoveState, { boardIndex: 0, squareIndex: 4 });
    const secondOMoveState = Ultimate.playSquare(secondXMoveState, { boardIndex: 4, squareIndex: 0 });
    const thirdXMoveState = Ultimate.playSquare(secondOMoveState, { boardIndex: 0, squareIndex: 0 }); // X wins board 0, O would otherwise need to play on that same board

    assert.deepEqual(
      thirdXMoveState.boards.map(board => board.isActive),
      Array(9).fill(true),
    );
  });

  it('playing a move on inactive board that takes the player to a won board should do nothing', () => {
    const firstXMoveState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 8 });
    const firstOMoveState = Ultimate.playSquare(firstXMoveState, { boardIndex: 8, squareIndex: 0 });
    const secondXMoveState = Ultimate.playSquare(firstOMoveState, { boardIndex: 0, squareIndex: 4 });
    const secondOMoveState = Ultimate.playSquare(secondXMoveState, { boardIndex: 4, squareIndex: 0 });
    const thirdXMoveState = Ultimate.playSquare(secondOMoveState, { boardIndex: 0, squareIndex: 0 }); // X wins board 0
    const thirdOMoveState = Ultimate.playSquare(thirdXMoveState, { boardIndex: 1, squareIndex: 8 }); // Inactivates all boards except 8.

    const fourthXMoveState = Ultimate.playSquare(thirdOMoveState, { boardIndex: 7, squareIndex: 0 }); // Move that takes the player to won board
    assert.deepEqual(fourthXMoveState, thirdOMoveState);
  });

  function assertImutability(oldState, newState) {
    /* eslint-disable no-param-reassign */
    newState.boards[7].isActive = 'bla bla bla';
    expect(oldState.boards[7].isActive).to.not.be.equal('bla bla bla', 'initial state must remain unchanged (isActive), use Array.map & Object.assign');

    newState.boards[7].squares[1] = 'noooo';
    expect(oldState.boards[7].squares[1]).to.not.be.equal('noooo', 'initial state must remain unchanged (square in a board), use Array.map & Object.assign');

    newState.nextPlayer = 'foo';
    expect(oldState.nextPlayer).to.not.equal('foo', 'nextPlayer property not deep copied');
  }
});

function getBoardsExcept(boards, boardIndexes) {
  const boardIndexIntegers = boardIndexes.map(index => parseInt(index, 10));
  return boards
    .filter((board, index) => !boardIndexIntegers.includes(index));
}
