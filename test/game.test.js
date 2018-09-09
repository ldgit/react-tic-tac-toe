import assert from 'assert';
import { expect } from 'chai';
import Ultimate from '../src/game';

function getCurrentBoards(state) {
  return state.history[state.history.length - 1].boards;
}

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

    // eslint-disable-next-line max-len
    it(`playing a square on initial board should mark that square as played by current player (square ${JSON.stringify(squareIndex)})`, () => {
      const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex });
      assert.deepEqual(getCurrentBoards(newState)[0].squares, ['X', ...Array(8).fill(null)]);
    });
  });

  it('changing board squares of new state should not alter previous state (immutability)', () => {
    const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 0 });

    expect(getCurrentBoards(initialState)[0].squares[0]).to.be.equal(null, 'played square was modified in the initial state');

    assert.notDeepEqual(getCurrentBoards(initialState), getCurrentBoards(newState), 'old boards array changed');
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
    assert.equal(getCurrentBoards(finalState)[0].squares[4], 'O');
    assert.equal(getCurrentBoards(finalState)[0].squares[0], 'X', 'First move not lost');
  });

  [0, 1, 3, 8, '2', '7'].forEach((squareIndex) => {
    // eslint-disable-next-line max-len
    it(`a move marks all boards except one that must be played next as inactive (squareIndex: ${JSON.stringify(squareIndex)})`, () => {
      const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex });
      assert.strictEqual(getCurrentBoards(newState)[squareIndex].isActive, true, `board ${squareIndex} must be active`);
      getCurrentBoards(newState)
        .filter((board, index) => index !== parseInt(squareIndex, 10))
        .forEach(board => assert.strictEqual(board.isActive, false, `board ${squareIndex} must be inactive`));
    });
  });

  // eslint-disable-next-line max-len
  it('move played on inactive board square does nothing (next player is sent to board in relative location to played square) *', () => {
    const newState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = Ultimate.playSquare(newState, { boardIndex: 1, squareIndex: 4 });
    expect(getCurrentBoards(finalState)[1].squares[4]).to.be.equal(null);

    assert.deepEqual(newState, finalState);
    assertImutability(newState, finalState);
  });

  [
    { move: { boardIndex: 6, squareIndex: 5 }, description: 'empty square', squareContent: null },
    { move: { boardIndex: 6, squareIndex: 1 }, description: 'occupied square', squareContent: 'X' },
  ].forEach(({ description, move, squareContent }) => {
    it(`move played on won board does nothing (${description}) *`, () => {
      getCurrentBoards(initialState)[6].squares = [...Array(3).fill('X'), ...Array(6).fill(null)];
      getCurrentBoards(initialState)[5].isActive = false;
      getCurrentBoards(initialState)[4].isActive = true;
      const newState = Ultimate.playSquare(initialState, move);

      expect(getCurrentBoards(newState)[move.boardIndex].squares[move.squareIndex]).to.be.equal(squareContent);
      assert.deepEqual(newState, initialState);
      assertImutability(newState, initialState);
    });
  });

  it('playing the same square twice will not advance to next player', () => {
    const midState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = Ultimate.playSquare(midState, { boardIndex: 0, squareIndex: 0 });
    assert.equal(finalState.nextPlayer, 'O');

    assert.notDeepEqual(getCurrentBoards(initialState), getCurrentBoards(finalState), 'old boards array changed');
    assertImutability(finalState, midState);
  });

  it('playing the same square twice will not change the value of that square', () => {
    const midState = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: 1 });
    const finalState = Ultimate.playSquare(midState, { boardIndex: 1, squareIndex: 1 });
    assert.equal(getCurrentBoards(finalState)[1].squares[1], 'X', 'O played on square occupied by X');
    assert.equal(finalState.nextPlayer, 'O');

    const stateOne = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 4 });
    const stateTwo = Ultimate.playSquare(stateOne, { boardIndex: 4, squareIndex: 0 });
    const stateThree = Ultimate.playSquare(stateTwo, { boardIndex: 0, squareIndex: 4 });
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

      const newState = Ultimate.playSquare(initialState, move);

      expect(getCurrentBoards(newState)[move.boardIndex].squares[move.squareIndex]).to.be.equal(squareContent);
      assert.deepEqual(newState, initialState);
      assertImutability(initialState, newState);
    });
  });

  [4, '4'].forEach((squareIndex) => {
    // eslint-disable-next-line max-len
    it(`clicking on an empty square on inactive board does not change boards isActive status (${JSON.stringify(squareIndex)})`, () => {
      const indexOfBoardThatMustRemainActive = 6;
      const newState = Ultimate.playSquare(initialState, {
        boardIndex: 0,
        squareIndex: indexOfBoardThatMustRemainActive,
      });
      const finalState = Ultimate.playSquare(newState, { boardIndex: 1, squareIndex });

      assert.strictEqual(getCurrentBoards(finalState)[indexOfBoardThatMustRemainActive].isActive, true, `board ${indexOfBoardThatMustRemainActive} must be active`);
      getBoardsExcept(getCurrentBoards(finalState), [indexOfBoardThatMustRemainActive]).forEach((board, boardIndex) => {
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

  // eslint-disable-next-line max-len
  it('if move takes the player to won board, mark all boards as active (covers the case where move that takes the player to won board is also the one that won that board)', () => {
    const firstXMoveState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 8 });
    const firstOMoveState = Ultimate.playSquare(firstXMoveState, { boardIndex: 8, squareIndex: 0 });
    const secondXMoveState = Ultimate.playSquare(firstOMoveState, { boardIndex: 0, squareIndex: 4 });
    const secondOMoveState = Ultimate.playSquare(secondXMoveState, { boardIndex: 4, squareIndex: 0 });
    // X wins board 0, O would otherwise need to play on that same board:
    const thirdXMoveState = Ultimate.playSquare(secondOMoveState, { boardIndex: 0, squareIndex: 0 });

    assert.deepEqual(
      getCurrentBoards(thirdXMoveState).map(board => board.isActive),
      Array(9).fill(true),
    );
  });

  it('playing a move on inactive board that takes the player to a won board should do nothing', () => {
    const firstXMoveState = Ultimate.playSquare(initialState, { boardIndex: 0, squareIndex: 8 });
    const firstOMoveState = Ultimate.playSquare(firstXMoveState, { boardIndex: 8, squareIndex: 0 });
    const secondXMoveState = Ultimate.playSquare(firstOMoveState, { boardIndex: 0, squareIndex: 4 });
    const secondOMoveState = Ultimate.playSquare(secondXMoveState, { boardIndex: 4, squareIndex: 0 });
    const thirdXMoveState = Ultimate.playSquare(secondOMoveState, { boardIndex: 0, squareIndex: 0 }); // X wins board 0
    // Inactivates all boards except 8:
    const thirdOMoveState = Ultimate.playSquare(thirdXMoveState, { boardIndex: 1, squareIndex: 8 });

    // Move that takes the player to won board:
    const fourthXMoveState = Ultimate.playSquare(thirdOMoveState, { boardIndex: 7, squareIndex: 0 });
    assert.deepEqual(fourthXMoveState, thirdOMoveState);
  });

  describe('history and time travel', () => {
    it('valid move should push new board state to history', () => {
      const newState = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: 8 });

      assert.deepEqual(newState.history[0].boards, getCurrentBoards(initialState), 'initial boards are not the first element in history, did you deep copy the boards (and their squares) when creating latest history entry?');
      assert.deepEqual(newState.history.length, 2, 'new state boards missing from history');
      assert.deepEqual(newState.history[1].boards, getCurrentBoards(newState));
    });

    it('valid move should increment pointInHistory in state', () => {
      let currentState;
      assert.equal(initialState.pointInHistory, 0);
      currentState = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: 8 });
      assert.equal(currentState.pointInHistory, 1);
      currentState = Ultimate.playSquare(currentState, { boardIndex: 8, squareIndex: 2 });
      assert.equal(currentState.pointInHistory, 2);
    });

    it('invalid move should not add more entries to history', () => {
      const stateBeforeInvalidMove = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: 8 });
      const stateAfterInvalidMove = Ultimate.playSquare(stateBeforeInvalidMove, { boardIndex: 7, squareIndex: 4 });

      assert.equal(stateAfterInvalidMove.history.length, 2, 'expecting no new entries in history');
      assert.deepEqual(getCurrentBoards(stateAfterInvalidMove), getCurrentBoards(stateBeforeInvalidMove));
    });

    it('changing one history entry should not change any others');

    describe('jump to a point in history', () => {
      it('should change pointInHistory property', () => {
        const newState = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: 8 });
        const stateAfterTimeTravel = Ultimate.timeTravel(newState, { pointInHistory: 0 });
        assert.strictEqual(stateAfterTimeTravel.pointInHistory, 0);
      });

      it('should change next player accordingly', () => {
        const firstMoveState = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: 8 });
        const secondMoveState = Ultimate.playSquare(firstMoveState, { boardIndex: 1, squareIndex: 8 });

        assert.equal(Ultimate.timeTravel(secondMoveState, { pointInHistory: 0 }).nextPlayer, 'X');
        assert.equal(Ultimate.timeTravel(secondMoveState, { pointInHistory: 1 }).nextPlayer, 'O');
      });

      it('should return a deep copy of input state', () => {
        const newState = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: 8 });

        const stateAfterTimeTravel = Ultimate.timeTravel(newState, { pointInHistory: 0 });

        stateAfterTimeTravel.pointInHistory = 1984;
        stateAfterTimeTravel.history[0].boards[4].squares[1] = 'modified in state returned by time travel, should not be in previus state';
        assert.strictEqual(newState.pointInHistory, 1, 'time travel must return a *copy* of input state');
        expect(newState.history[0].boards[4].squares[1]).to.equal(null, 'time travel must return a *deep copy* of input state');
      });

      it(
        'when time traveling to past and then playing a move, should discard all history after that time travel point',
        () => {
          const moveOneState = Ultimate.playSquare(initialState, { boardIndex: 4, squareIndex: 0 });
          const moveTwoState = Ultimate.playSquare(moveOneState, { boardIndex: 0, squareIndex: 2 });
          const moveThreeState = Ultimate.playSquare(moveTwoState, { boardIndex: 2, squareIndex: 3 });

          const stateAfterTimeTravelToMoveOne = Ultimate.timeTravel(moveThreeState, { pointInHistory: 1 });
          const finalState = Ultimate.playSquare(stateAfterTimeTravelToMoveOne, { boardIndex: 0, squareIndex: 3 });

          assert.deepEqual(finalState.history.slice(0, 2), moveOneState.history, 'First to history entries equal to move one state');
          assert.deepEqual(finalState.history.length, 3, 'History after time travel and one move should have only three entries');
        },
      );

      it('when time traveling to past, all rules related to that move apply', () => {
        const moveOneState = Ultimate.playSquare(initialState, { boardIndex: 4, squareIndex: 0 });
        const moveTwoState = Ultimate.playSquare(moveOneState, { boardIndex: 0, squareIndex: 2 });
        const moveThreeState = Ultimate.playSquare(moveTwoState, { boardIndex: 2, squareIndex: 3 });

        const stateAfterTimeTravelToMoveOne = Ultimate.timeTravel(moveThreeState, { pointInHistory: 1 });
        const invalidMoveState = Ultimate.playSquare(stateAfterTimeTravelToMoveOne, { boardIndex: 1, squareIndex: 3 });

        assert.deepEqual(invalidMoveState, stateAfterTimeTravelToMoveOne, 'nothing must change after time travel followed by invalid move');
      });

      it('Play one move, then back to game start, then repeat the move. Next player should be O.', () => {
        const moveOneState = Ultimate.playSquare(initialState, { boardIndex: 4, squareIndex: 0 });
        const backToGameStart = Ultimate.timeTravel(moveOneState, { pointInHistory: 0 });
        const repeatedMoveOneState = Ultimate.playSquare(backToGameStart, { boardIndex: 4, squareIndex: 0 });

        assert.equal(repeatedMoveOneState.nextPlayer, 'O');
      });

      it.skip('should not delete history entries', () => {
        const midState = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: '8' });
        const stateBeforeTimeTravel = Ultimate.playSquare(midState, { boardIndex: 8, squareIndex: '5' });
        const stateAfterTimeTravel = Ultimate.timeTravel(stateBeforeTimeTravel, { pointInHistory: 0 });

        assert.equal(stateAfterTimeTravel.history.length, stateBeforeTimeTravel.history.length);
        assert.deepEqual(stateAfterTimeTravel.history, stateBeforeTimeTravel.history);
      });

      it.skip('after playing a new valid move, all history after that move is discarded', () => {
        const midState = Ultimate.playSquare(initialState, { boardIndex: 1, squareIndex: '8' });
        const stateBeforeTimeTravel = Ultimate.playSquare(midState, { boardIndex: 8, squareIndex: '5' });

        const stateAfterTimeTravel = Ultimate.timeTravel(stateBeforeTimeTravel, { pointInHistory: 0 });
        const stateAfterValidMove = Ultimate.playSquare(stateAfterTimeTravel, { boardIndex: 8, squareIndex: '3' });

        assert.equal(stateAfterValidMove.history.length, 1);
      });

      it('playing an invalid move, history is unchanged (already tested in tests marked with *)', () => {});
    });
  });

  function assertImutability(oldState, newState) {
    /* eslint-disable no-param-reassign */
    getCurrentBoards(newState)[7].isActive = 'bla bla bla';
    expect(getCurrentBoards(oldState)[7].isActive).to.not.be.equal(
      'bla bla bla',
      'initial state must remain unchanged (isActive), use Array.map & Object.assign',
    );

    getCurrentBoards(newState)[7].squares[1] = 'noooo';
    expect(getCurrentBoards(oldState)[7].squares[1]).to.not.be.equal(
      'noooo',
      'initial state must remain unchanged (square in a board), use Array.map & Object.assign',
    );

    newState.nextPlayer = 'foo';
    expect(oldState.nextPlayer).to.not.equal('foo', 'nextPlayer property not deep copied');

    newState.pointInHistory = 'bar';
    expect(oldState.pointInHistory).to.not.equal('bar', 'pointInHistory property not deep copied');
  }
});

describe('deepCopyGameState', () => {
  it('should copy top level properties');
  it('should copy squares for each boards array in history');
});

function getBoardsExcept(boards, boardIndexes) {
  const boardIndexIntegers = boardIndexes.map(index => parseInt(index, 10));
  return boards
    .filter((board, index) => !boardIndexIntegers.includes(index));
}
