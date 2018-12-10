/* eslint max-len: ['warn', 150, 2] */
import assert from 'assert';
import { expect } from 'chai';
import { calculateUltimateWinner, ultimateTicTacToe } from '../src/ultimate-game';
import { deepFreeze } from './test-utils';

function getCurrentBoards(state) {
  return state.history[state.history.length - 1].boards;
}

function callPlaySquare(oldState, { boardIndex, squareIndex }) {
  if (!Object.isFrozen(oldState)) deepFreeze(oldState);
  const action = { type: 'PLAY_SQUARE', boardIndex, squareIndex };
  deepFreeze(action);

  return ultimateTicTacToe(oldState, action);
}

function callTimeTravel(oldState, { pointInHistory }) {
  if (!Object.isFrozen(oldState)) deepFreeze(oldState);
  const action = { type: 'TIME_TRAVEL', pointInHistory };
  deepFreeze(action);

  return ultimateTicTacToe(oldState, action);
}

function callCalculateUltimateWinner(boards) {
  if (!Object.isFrozen(boards)) deepFreeze(boards);

  return calculateUltimateWinner(boards);
}

describe('PLAY_SQUARE', () => {
  let initialState;

  beforeEach(() => {
    initialState = ultimateTicTacToe(undefined, { type: 'NOT_IMPORTANT' });
  });

  it('should just return state unchanged if action not known', () => {
    initialState.specialIcons = true;
    deepFreeze(initialState);
    assert.deepEqual(initialState, ultimateTicTacToe(initialState, { type: 'DOES_NOT_EXIST' }));
  });

  ['0', 0].forEach((squareIndex) => {
    it(`playing a square on initial board should advance to next player (square${JSON.stringify(squareIndex)})`, () => {
      const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex });
      assert.equal(newState.nextPlayer, 'O');
    });

    // eslint-disable-next-line max-len
    it(`playing a square on initial board should mark that square as played by current player (square ${JSON.stringify(squareIndex)})`, () => {
      const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex });
      assert.deepEqual(getCurrentBoards(newState)[0].squares, ['X', ...Array(8).fill(null)]);
    });
  });

  it('second move should correctly update next player', () => {
    const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = callPlaySquare(newState, { boardIndex: 0, squareIndex: 4 });
    assert.equal(finalState.nextPlayer, 'X');
  });

  it('second move should mark that square as played by first player', () => {
    const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = callPlaySquare(newState, { boardIndex: 0, squareIndex: 4 });
    assert.equal(getCurrentBoards(finalState)[0].squares[4], 'O');
    assert.equal(getCurrentBoards(finalState)[0].squares[0], 'X', 'First move not lost');
  });

  [0, 1, 3, 8, '2', '7'].forEach((squareIndex) => {
    // eslint-disable-next-line max-len
    it(`a move marks all boards except one that must be played next as inactive (squareIndex: ${JSON.stringify(squareIndex)})`, () => {
      const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex });
      assert.strictEqual(getCurrentBoards(newState)[squareIndex].isActive, true, `board ${squareIndex} must be active`);
      getCurrentBoards(newState)
        .filter((board, index) => index !== parseInt(squareIndex, 10))
        .forEach(board => assert.strictEqual(board.isActive, false, `board ${squareIndex} must be inactive`));
    });
  });

  // eslint-disable-next-line max-len
  it('move played on inactive board square does nothing (next player is sent to board in relative location to played square) *', () => {
    const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = callPlaySquare(newState, { boardIndex: 1, squareIndex: 4 });
    expect(getCurrentBoards(finalState)[1].squares[4]).to.be.equal(null);

    assert.deepEqual(newState, finalState);
  });

  [
    { move: { boardIndex: 6, squareIndex: 5 }, description: 'empty square', squareContent: null },
    { move: { boardIndex: 6, squareIndex: 1 }, description: 'occupied square', squareContent: 'X' },
  ].forEach(({ description, move, squareContent }) => {
    it(`move played on won board does nothing (${description}) *`, () => {
      getCurrentBoards(initialState)[6].squares = [...Array(3).fill('X'), ...Array(6).fill(null)];
      getCurrentBoards(initialState)[5].isActive = false;
      getCurrentBoards(initialState)[4].isActive = true;

      const newState = callPlaySquare(initialState, move);

      expect(getCurrentBoards(newState)[move.boardIndex].squares[move.squareIndex]).to.be.equal(squareContent);
      assert.deepEqual(newState, initialState);
    });
  });

  it('playing the same square twice will not advance to next player', () => {
    const midState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = callPlaySquare(midState, { boardIndex: 0, squareIndex: 0 });
    assert.equal(finalState.nextPlayer, 'O');

    assert.notDeepEqual(getCurrentBoards(initialState), getCurrentBoards(finalState), 'old boards array changed');
  });

  it('playing the same square twice will not change the value of that square', () => {
    const midState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 1 });
    const finalState = callPlaySquare(midState, { boardIndex: 1, squareIndex: 1 });
    assert.equal(getCurrentBoards(finalState)[1].squares[1], 'X', 'O played on square occupied by X');
    assert.equal(finalState.nextPlayer, 'O');

    const stateOne = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 4 });
    const stateTwo = callPlaySquare(stateOne, { boardIndex: 4, squareIndex: 0 });
    const stateThree = callPlaySquare(stateTwo, { boardIndex: 0, squareIndex: 4 });
    assert.equal(getCurrentBoards(stateThree)[0].squares[4], 'X', 'X played on square occupied by X');
    assert.equal(stateThree.nextPlayer, 'X');
  });

  [
    { move: { boardIndex: 6, squareIndex: 5 }, description: 'empty square', squareContent: null },
    { move: { boardIndex: 0, squareIndex: 0 }, description: 'occupied square', squareContent: 'X' },
  ].forEach(({ move, description, squareContent }) => {
    it(`new moves do nothing if game won ${description} *`, () => {
      getCurrentBoards(initialState)[0].squares = [...Array(3).fill('X'), ...Array(6).fill(null)];
      getCurrentBoards(initialState)[4].squares = [...Array(6).fill(null), ...Array(3).fill('X')];
      getCurrentBoards(initialState)[8].squares = ['X', null, null, null, 'X', null, null, null, 'X'];

      const newState = callPlaySquare(initialState, move);

      expect(getCurrentBoards(newState)[move.boardIndex].squares[move.squareIndex]).to.be.equal(squareContent);
      assert.deepEqual(newState, initialState);
    });
  });

  [4, '4'].forEach((squareIndex) => {
    // eslint-disable-next-line max-len
    it(`clicking on an empty square on inactive board does not change boards isActive status (${JSON.stringify(squareIndex)})`, () => {
      const indexOfBoardThatMustRemainActive = 6;
      const newState = callPlaySquare(initialState, {
        boardIndex: 0,
        squareIndex: indexOfBoardThatMustRemainActive,
      });
      const finalState = callPlaySquare(newState, { boardIndex: 1, squareIndex });

      assert.strictEqual(
        getCurrentBoards(finalState)[indexOfBoardThatMustRemainActive].isActive,
        true,
        `board ${indexOfBoardThatMustRemainActive} must be active`,
      );
      getBoardsExcept(getCurrentBoards(finalState), [indexOfBoardThatMustRemainActive]).forEach((board, boardIndex) => {
        assert.strictEqual(board.isActive, false, `board ${boardIndex} must be inactive`);
      });
    });
  });

  it('playing an occupied square on inactive board does nothing', () => {
    const midState = callPlaySquare(initialState, { boardIndex: 8, squareIndex: '4' });
    const finalState = callPlaySquare(midState, { boardIndex: 8, squareIndex: '4' });

    assert.deepEqual(finalState, midState);
  });

  // eslint-disable-next-line max-len
  it('if move takes the player to won board, mark all boards as active (covers the case where move that takes the player to won board is also the one that won that board)', () => {
    const firstXMoveState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 8 });
    const firstOMoveState = callPlaySquare(firstXMoveState, { boardIndex: 8, squareIndex: 0 });
    const secondXMoveState = callPlaySquare(firstOMoveState, { boardIndex: 0, squareIndex: 4 });
    const secondOMoveState = callPlaySquare(secondXMoveState, { boardIndex: 4, squareIndex: 0 });
    // X wins board 0, O would otherwise need to play on that same board:
    const thirdXMoveState = callPlaySquare(secondOMoveState, { boardIndex: 0, squareIndex: 0 });

    assert.deepEqual(
      getCurrentBoards(thirdXMoveState).map(board => board.isActive),
      Array(9).fill(true),
    );
  });

  it('playing a move on inactive board that takes the player to a won board should do nothing', () => {
    const firstXMoveState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 8 });
    const firstOMoveState = callPlaySquare(firstXMoveState, { boardIndex: 8, squareIndex: 0 });
    const secondXMoveState = callPlaySquare(firstOMoveState, { boardIndex: 0, squareIndex: 4 });
    const secondOMoveState = callPlaySquare(secondXMoveState, { boardIndex: 4, squareIndex: 0 });
    const thirdXMoveState = callPlaySquare(secondOMoveState, { boardIndex: 0, squareIndex: 0 }); // X wins board 0
    // Inactivates all boards except 8:
    const thirdOMoveState = callPlaySquare(thirdXMoveState, { boardIndex: 1, squareIndex: 8 });

    // Move that takes the player to won board:
    const fourthXMoveState = callPlaySquare(thirdOMoveState, { boardIndex: 7, squareIndex: 0 });
    assert.deepEqual(fourthXMoveState, thirdOMoveState);
  });

  context('history and time travel', () => {
    it('valid move should push new board state to history', () => {
      const newState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });

      assert.deepEqual(
        newState.history[0].boards,
        getCurrentBoards(initialState),
        'initial boards are not the first element in history, did you deep copy the boards (and their squares) when creating latest history entry?',
      );
      assert.deepEqual(newState.history.length, 2, 'new state boards missing from history');
      assert.deepEqual(newState.history[1].boards, getCurrentBoards(newState));
    });

    it('valid move should increment pointInHistory in state', () => {
      let currentState;
      assert.equal(initialState.pointInHistory, 0);
      currentState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });
      assert.equal(currentState.pointInHistory, 1);
      currentState = callPlaySquare(currentState, { boardIndex: 8, squareIndex: 2 });
      assert.equal(currentState.pointInHistory, 2);
    });

    it('invalid move should not add more entries to history', () => {
      const stateBeforeInvalidMove = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });
      const stateAfterInvalidMove = callPlaySquare(stateBeforeInvalidMove, { boardIndex: 7, squareIndex: 4 });

      assert.equal(stateAfterInvalidMove.history.length, 2, 'expecting no new entries in history');
      assert.deepEqual(getCurrentBoards(stateAfterInvalidMove), getCurrentBoards(stateBeforeInvalidMove));
    });

    context('jump to a point in history', () => {
      it('should change pointInHistory property', () => {
        const newState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });
        const stateAfterTimeTravel = callTimeTravel(newState, { pointInHistory: 0 });
        assert.strictEqual(stateAfterTimeTravel.pointInHistory, 0);
      });

      it('should change next player accordingly', () => {
        const firstMoveState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });
        const secondMoveState = callPlaySquare(firstMoveState, { boardIndex: 1, squareIndex: 8 });

        assert.equal(callTimeTravel(secondMoveState, { pointInHistory: 0 }).nextPlayer, 'X');
        assert.equal(callTimeTravel(secondMoveState, { pointInHistory: 1 }).nextPlayer, 'O');
      });

      it('should return a deep copy of input state', () => {
        const newState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });

        const stateAfterTimeTravel = callTimeTravel(newState, { pointInHistory: 0 });

        stateAfterTimeTravel.pointInHistory = 1984;
        stateAfterTimeTravel.history[0].boards[4].squares[1] = 'modified in state returned by time travel, should not be in previus state';
        assert.strictEqual(newState.pointInHistory, 1, 'time travel must return a *copy* of input state');
        expect(newState.history[0].boards[4].squares[1]).to.equal(null, 'time travel must return a *deep copy* of input state');
      });

      it(
        'when time traveling to past and then playing a move, should discard all history after that time travel point',
        () => {
          const moveOneState = callPlaySquare(initialState, { boardIndex: 4, squareIndex: 0 });
          const moveTwoState = callPlaySquare(moveOneState, { boardIndex: 0, squareIndex: 2 });
          const moveThreeState = callPlaySquare(moveTwoState, { boardIndex: 2, squareIndex: 3 });

          const stateAfterTimeTravelToMoveOne = callTimeTravel(moveThreeState, { pointInHistory: 1 });
          const finalState = callPlaySquare(stateAfterTimeTravelToMoveOne, { boardIndex: 0, squareIndex: 3 });

          assert.deepEqual(finalState.history.slice(0, 2), moveOneState.history, 'First to history entries equal to move one state');
          assert.deepEqual(finalState.history.length, 3, 'History after time travel and one move should have only three entries');
        },
      );

      it('when time traveling to past, all rules related to that move apply', () => {
        const moveOneState = callPlaySquare(initialState, { boardIndex: 4, squareIndex: 0 });
        const moveTwoState = callPlaySquare(moveOneState, { boardIndex: 0, squareIndex: 2 });
        const moveThreeState = callPlaySquare(moveTwoState, { boardIndex: 2, squareIndex: 3 });

        const stateAfterTimeTravelToMoveOne = callTimeTravel(moveThreeState, { pointInHistory: 1 });
        const invalidMoveState = callPlaySquare(stateAfterTimeTravelToMoveOne, { boardIndex: 1, squareIndex: 3 });

        assert.deepEqual(invalidMoveState, stateAfterTimeTravelToMoveOne, 'nothing must change after time travel followed by invalid move');
      });

      it('play one move, then back to game start, then repeat the move. Next player should be O.', () => {
        const moveOneState = callPlaySquare(initialState, { boardIndex: 4, squareIndex: 0 });
        const backToGameStart = callTimeTravel(moveOneState, { pointInHistory: 0 });
        const repeatedMoveOneState = callPlaySquare(backToGameStart, { boardIndex: 4, squareIndex: 0 });

        assert.equal(repeatedMoveOneState.nextPlayer, 'O');
      });

      it('should not delete history entries', () => {
        const midState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: '8' });
        const stateBeforeTimeTravel = callPlaySquare(midState, { boardIndex: 8, squareIndex: '5' });
        const stateAfterTimeTravel = callTimeTravel(stateBeforeTimeTravel, { pointInHistory: 0 });

        assert.equal(stateAfterTimeTravel.history.length, stateBeforeTimeTravel.history.length);
        assert.deepEqual(stateAfterTimeTravel.history, stateBeforeTimeTravel.history);
      });

      it('after playing a new valid move, all history after that move is discarded', () => {
        const midState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: '8' });
        let stateBeforeTimeTravel = callPlaySquare(midState, { boardIndex: 8, squareIndex: '5' });
        stateBeforeTimeTravel = callPlaySquare(stateBeforeTimeTravel, { boardIndex: 5, squareIndex: '5' });

        const stateAfterTimeTravel = callTimeTravel(stateBeforeTimeTravel, { pointInHistory: 0 });
        const stateAfterValidMove = callPlaySquare(stateAfterTimeTravel, { boardIndex: 8, squareIndex: '3' });

        assert.equal(stateAfterValidMove.history.length, 2);
      });

      it('playing an invalid move, history is unchanged (already tested in tests marked with *)', () => { });
    });
  });
});

describe('calculateUltimateWinner', () => {
  it('should return null for initial empty boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    assert.strictEqual(callCalculateUltimateWinner(boards), null);
  });

  it('should return null if ony two boards won', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[1].squares = ['O', 'O', 'O', ...Array(6).fill(null)];
    boards[3].squares = [...Array(6).fill(null), 'O', 'O', 'O'];

    assert.strictEqual(callCalculateUltimateWinner(boards), null);
  });

  it('should return null if top row of boards won, but by different players', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['X', 'X', 'X', ...Array(6).fill(null)];
    boards[1].squares = [...Array(6).fill(null), 'O', 'O', 'O'];
    boards[2].squares = ['X', null, null, null, 'X', null, null, null, 'X'];

    assert.strictEqual(callCalculateUltimateWinner(boards), null);
  });

  it('should return X if X won top row of boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['X', 'X', 'X', ...Array(6).fill(null)];
    boards[1].squares = [...Array(6).fill(null), 'X', 'X', 'X'];
    boards[2].squares = ['X', null, null, null, 'X', null, null, null, 'X'];

    assert.strictEqual(callCalculateUltimateWinner(boards), 'X');
  });

  it('should return O if O won left column of boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['O', null, null, 'O', null, null, 'O', null, null];
    boards[3].squares = [null, null, 'O', null, 'O', null, 'O', null, null];
    boards[6].squares = [null, 'O', null, null, 'O', null, null, 'O', null];

    assert.strictEqual(callCalculateUltimateWinner(boards), 'O');
  });

  it('should return X if X won diagonal boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['X', null, null, 'X', null, null, 'X', null, null];
    boards[4].squares = [null, null, 'X', null, 'X', null, 'X', null, null];
    boards[8].squares = [null, 'X', null, null, 'X', null, null, 'X', null];

    assert.strictEqual(callCalculateUltimateWinner(boards), 'X');
  });

  it('should return O if O won reverse diagonal boards', () => {
    const boards = Array(9).fill().map(() => ({ squares: emptySquares(), isActive: false }));
    boards[2].squares = ['O', null, null, 'O', null, null, 'O', null, null];
    boards[4].squares = [null, null, 'O', null, 'O', null, 'O', null, null];
    boards[6].squares = [null, 'O', null, null, 'O', null, null, 'O', null];

    assert.strictEqual(callCalculateUltimateWinner(boards), 'O');
  });
});

function getBoardsExcept(boards, boardIndexes) {
  const boardIndexIntegers = boardIndexes.map(index => parseInt(index, 10));
  return boards
    .filter((board, index) => !boardIndexIntegers.includes(index));
}

function emptySquares() {
  return Array(9).fill(null);
}
