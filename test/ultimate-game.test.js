import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { calculateUltimateWinner, ultimateTicTacToe } from '../src/ultimate-game';
import { playSquare, timeTravel, toggleSpecialIcons } from '../src/actions';
import drawSquareGameState from './fixtures/draw-square-game.json';
import fullAndWonBoardState from './fixtures/full-won-board.json';

function getCurrentBoards(state) {
  return state.history[state.history.length - 1].boards;
}

function callPlaySquare(oldState, { boardIndex, squareIndex }) {
  deepFreeze(oldState);
  const action = playSquare(boardIndex, squareIndex);
  deepFreeze(action);

  return ultimateTicTacToe(oldState, action);
}

function callTimeTravel(oldState, { pointInHistory }) {
  deepFreeze(oldState);
  const action = timeTravel(pointInHistory);
  deepFreeze(action);

  return ultimateTicTacToe(oldState, action);
}

function callCalculateUltimateWinner(boards) {
  deepFreeze(boards);

  return calculateUltimateWinner(boards);
}

describe('ultimate tic-tac-toe', () => {
  let initialState;

  beforeEach(() => {
    initialState = ultimateTicTacToe(undefined, { type: 'NOT_IMPORTANT' });
  });

  it('should just return state unchanged if action not known', () => {
    initialState.specialIcons = true;
    deepFreeze(initialState);
    expect(ultimateTicTacToe(initialState, { type: 'DOES_NOT_EXIST' })).to.eql(initialState);
  });

  ['0', 0].forEach(squareIndex => {
    it(`playing a square on initial board should advance to next player (square${JSON.stringify(
      squareIndex,
    )})`, () => {
      const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex });
      expect(newState.nextPlayer).to.equal('O');
    });

    it(`playing a square on initial board should mark that square as played by current player (square ${JSON.stringify(
      squareIndex,
    )})`, () => {
      const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex });
      expect(getCurrentBoards(newState)[0].squares).to.eql(['X', ...Array(8).fill(null)]);
    });
  });

  it('playing a square must handle square index as text', () => {
    // Otherwise this causes problems in, for example, .slice(), because '4' + 1 === '41' instead of 5
    const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: '5' });
    expect(getCurrentBoards(newState)[0].squares.length).to.equal(9);
  });

  it('second move should correctly update next player', () => {
    const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = callPlaySquare(newState, { boardIndex: 0, squareIndex: 4 });
    expect(finalState.nextPlayer).to.equal('X');
  });

  it('second move should mark that square as played by first player', () => {
    const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = callPlaySquare(newState, { boardIndex: 0, squareIndex: 4 });
    expect(getCurrentBoards(finalState)[0].squares[4]).to.equal('O');
    expect(getCurrentBoards(finalState)[0].squares[0]).to.equal('X', 'First move is not lost');
  });

  [0, 1, 3, 8, '2', '7'].forEach(squareIndex => {
    it(`a move marks all boards except one that must be played next as inactive (squareIndex: ${JSON.stringify(
      squareIndex,
    )})`, () => {
      const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex });
      expect(
        getCurrentBoards(newState)[squareIndex].isActive,
        `board ${squareIndex} must be active`,
      ).to.be.true;
      getCurrentBoards(newState)
        .filter((board, index) => index !== parseInt(squareIndex, 10))
        .forEach(
          board => expect(board.isActive, `board ${squareIndex} must be inactive`).to.be.false,
        );
    });
  });

  it('move played on inactive board square does nothing (next player is sent to board in relative location to played square) *', () => {
    const newState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = callPlaySquare(newState, { boardIndex: 1, squareIndex: 4 });
    expect(getCurrentBoards(finalState)[1].squares[4]).to.be.equal(null);

    expect(finalState).to.eql(newState);
  });

  [
    {
      move: { boardIndex: 6, squareIndex: 5 },
      description: 'empty square',
      squareContent: null,
    },
    {
      move: { boardIndex: 6, squareIndex: 1 },
      description: 'occupied square',
      squareContent: 'X',
    },
  ].forEach(({ description, move, squareContent }) => {
    it(`move played on won board does nothing (${description}) *`, () => {
      getCurrentBoards(initialState)[6].squares = [...Array(3).fill('X'), ...Array(6).fill(null)];
      getCurrentBoards(initialState)[5].isActive = false;
      getCurrentBoards(initialState)[4].isActive = true;

      const newState = callPlaySquare(initialState, move);

      expect(getCurrentBoards(newState)[move.boardIndex].squares[move.squareIndex]).to.be.equal(
        squareContent,
      );
      expect(newState).to.eql(initialState);
    });
  });

  it('playing the same square twice will not advance to next player', () => {
    const midState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 0 });
    const finalState = callPlaySquare(midState, { boardIndex: 0, squareIndex: 0 });
    expect(finalState.nextPlayer).to.equal('O');

    expect(getCurrentBoards(initialState)).to.not.eql(
      getCurrentBoards(finalState),
      'old boards array changed',
    );
  });

  it('playing the same square twice will not change the value of that square', () => {
    const midState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 1 });
    const finalState = callPlaySquare(midState, { boardIndex: 1, squareIndex: 1 });
    expect(getCurrentBoards(finalState)[1].squares[1]).to.equal(
      'X',
      'O played on square occupied by X',
    );
    expect(finalState.nextPlayer).to.equal('O');

    const stateOne = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 4 });
    const stateTwo = callPlaySquare(stateOne, { boardIndex: 4, squareIndex: 0 });
    const stateThree = callPlaySquare(stateTwo, { boardIndex: 0, squareIndex: 4 });
    expect(getCurrentBoards(stateThree)[0].squares[4]).to.equal(
      'X',
      'X played on square occupied by X',
    );
    expect(stateThree.nextPlayer).to.equal('X');
  });

  [
    {
      move: { boardIndex: 6, squareIndex: 5 },
      description: 'empty square',
      squareContent: null,
    },
    {
      move: { boardIndex: 0, squareIndex: 0 },
      description: 'occupied square',
      squareContent: 'X',
    },
  ].forEach(({ move, description, squareContent }) => {
    it(`new moves do nothing if game won ${description} *`, () => {
      getCurrentBoards(initialState)[0].squares = [...Array(3).fill('X'), ...Array(6).fill(null)];
      getCurrentBoards(initialState)[4].squares = [...Array(6).fill(null), ...Array(3).fill('X')];
      getCurrentBoards(initialState)[8].squares = [
        'X',
        null,
        null,
        null,
        'X',
        null,
        null,
        null,
        'X',
      ];

      const newState = callPlaySquare(initialState, move);

      expect(getCurrentBoards(newState)[move.boardIndex].squares[move.squareIndex]).to.be.equal(
        squareContent,
      );
      expect(newState).to.eql(initialState);
    });
  });

  [4, '4'].forEach(squareIndex => {
    it(`clicking on an empty square on inactive board does not change boards isActive status (${JSON.stringify(
      squareIndex,
    )})`, () => {
      const indexOfBoardThatMustRemainActive = 6;
      const newState = callPlaySquare(initialState, {
        boardIndex: 0,
        squareIndex: indexOfBoardThatMustRemainActive,
      });
      const finalState = callPlaySquare(newState, { boardIndex: 1, squareIndex });

      expect(
        getCurrentBoards(finalState)[indexOfBoardThatMustRemainActive].isActive,
        `board ${indexOfBoardThatMustRemainActive} must be active`,
      ).to.be.true;
      getBoardsExcept(getCurrentBoards(finalState), [indexOfBoardThatMustRemainActive]).forEach(
        (board, boardIndex) =>
          expect(board.isActive, `board ${boardIndex} must be inactive`).to.be.false,
      );
    });
  });

  it('playing an occupied square on inactive board does nothing', () => {
    const midState = callPlaySquare(initialState, { boardIndex: 8, squareIndex: '4' });
    const finalState = callPlaySquare(midState, { boardIndex: 8, squareIndex: '4' });

    expect(finalState).to.eql(midState);
  });

  it('if move takes the player to won board, mark all boards as active (covers the case where move that takes the player to won board is also the one that won that board)', () => {
    const firstXMoveState = callPlaySquare(initialState, { boardIndex: 0, squareIndex: 8 });
    const firstOMoveState = callPlaySquare(firstXMoveState, { boardIndex: 8, squareIndex: 0 });
    const secondXMoveState = callPlaySquare(firstOMoveState, { boardIndex: 0, squareIndex: 4 });
    const secondOMoveState = callPlaySquare(secondXMoveState, { boardIndex: 4, squareIndex: 0 });
    // X wins board 0, O would otherwise need to play on that same board:
    const thirdXMoveState = callPlaySquare(secondOMoveState, { boardIndex: 0, squareIndex: 0 });

    expect(getCurrentBoards(thirdXMoveState).map(board => board.isActive)).to.eql(
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
    expect(fourthXMoveState).to.eql(thirdOMoveState);
  });

  it('should mark all boards as active when played square moves player to a full board', () => {
    // This move fills top left board and no one wins it
    const newState = callPlaySquare(drawSquareGameState, { boardIndex: 0, squareIndex: 0 });

    const currentBoards = getCurrentBoards(newState);
    const currentlyActiveBoards = currentBoards.filter(board => board.isActive);
    expect(currentlyActiveBoards, 'All boards are active except last played one').to.be.lengthOf(9);
  });

  it('should mark all boards as active when played square moves player to a full won board', () => {
    // This move fills top left board and wins it for player X
    const newState = callPlaySquare(fullAndWonBoardState, { boardIndex: 0, squareIndex: 0 });

    const currentBoards = getCurrentBoards(newState);
    const currentlyActiveBoards = currentBoards.filter(board => board.isActive);
    expect(currentlyActiveBoards, 'All boards are active except last played one').to.be.lengthOf(9);
  });

  describe('history and time travel', () => {
    it('valid move should push new board state to history', () => {
      const newState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });

      expect(newState.history[0].boards).to.eql(
        getCurrentBoards(initialState),
        'initial boards are not the first element in history, did you deep copy the boards (and their squares) when creating latest history entry?',
      );
      expect(newState.history).to.have.lengthOf(2, 'new state boards missing from history');
      expect(newState.history[1].boards).to.eql(getCurrentBoards(newState));
    });

    it('valid move should increment pointInHistory in state', () => {
      let currentState;
      expect(initialState.pointInHistory).to.equal(0);
      currentState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });
      expect(currentState.pointInHistory).to.equal(1);
      currentState = callPlaySquare(currentState, { boardIndex: 8, squareIndex: 2 });
      expect(currentState.pointInHistory).to.equal(2);
    });

    it('invalid move should not add more entries to history', () => {
      const stateBeforeInvalidMove = callPlaySquare(initialState, {
        boardIndex: 1,
        squareIndex: 8,
      });
      const stateAfterInvalidMove = callPlaySquare(stateBeforeInvalidMove, {
        boardIndex: 7,
        squareIndex: 4,
      });

      expect(stateAfterInvalidMove.history).to.be.lengthOf(2, 'expect no new entries in history');
      expect(getCurrentBoards(stateAfterInvalidMove)).to.eql(
        getCurrentBoards(stateBeforeInvalidMove),
      );
    });

    describe('jump to a point in history', () => {
      it('should change pointInHistory property', () => {
        const newState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });
        const stateAfterTimeTravel = callTimeTravel(newState, { pointInHistory: 0 });
        expect(stateAfterTimeTravel.pointInHistory).to.equal(0);
      });

      it('should change next player accordingly', () => {
        const firstMoveState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: 8 });
        const secondMoveState = callPlaySquare(firstMoveState, { boardIndex: 1, squareIndex: 8 });

        expect(callTimeTravel(secondMoveState, { pointInHistory: 0 }).nextPlayer).to.equal('X');
        expect(callTimeTravel(secondMoveState, { pointInHistory: 1 }).nextPlayer).to.equal('O');
      });

      it('when time traveling to past and then playing a move, should discard all history after that time travel point', () => {
        const moveOneState = callPlaySquare(initialState, { boardIndex: 4, squareIndex: 0 });
        const moveTwoState = callPlaySquare(moveOneState, { boardIndex: 0, squareIndex: 2 });
        const moveThreeState = callPlaySquare(moveTwoState, { boardIndex: 2, squareIndex: 3 });

        const stateAfterTimeTravelToMoveOne = callTimeTravel(moveThreeState, { pointInHistory: 1 });
        const finalState = callPlaySquare(stateAfterTimeTravelToMoveOne, {
          boardIndex: 0,
          squareIndex: 3,
        });

        expect(finalState.history.slice(0, 2)).to.eql(
          moveOneState.history,
          'First to history entries equal to move one state',
        );
        expect(finalState.history).to.be.lengthOf(
          3,
          'History after time travel and one move should have only three entries',
        );
      });

      it('when time traveling to past, all rules related to that move apply', () => {
        const moveOneState = callPlaySquare(initialState, { boardIndex: 4, squareIndex: 0 });
        const moveTwoState = callPlaySquare(moveOneState, { boardIndex: 0, squareIndex: 2 });
        const moveThreeState = callPlaySquare(moveTwoState, { boardIndex: 2, squareIndex: 3 });

        const stateAfterTimeTravelToMoveOne = callTimeTravel(moveThreeState, { pointInHistory: 1 });
        const invalidMoveState = callPlaySquare(stateAfterTimeTravelToMoveOne, {
          boardIndex: 1,
          squareIndex: 3,
        });

        expect(invalidMoveState).to.eql(
          stateAfterTimeTravelToMoveOne,
          'nothing must change after time travel followed by invalid move',
        );
      });

      it('play one move, then back to game start, then repeat the move. Next player should be O.', () => {
        const moveOneState = callPlaySquare(initialState, { boardIndex: 4, squareIndex: 0 });
        const backToGameStart = callTimeTravel(moveOneState, { pointInHistory: 0 });
        const repeatedMoveOneState = callPlaySquare(backToGameStart, {
          boardIndex: 4,
          squareIndex: 0,
        });

        expect(repeatedMoveOneState.nextPlayer).to.equal('O');
      });

      it('should not delete history entries', () => {
        const midState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: '8' });
        const stateBeforeTimeTravel = callPlaySquare(midState, { boardIndex: 8, squareIndex: '5' });
        const stateAfterTimeTravel = callTimeTravel(stateBeforeTimeTravel, { pointInHistory: 0 });

        expect(stateAfterTimeTravel.history.length).to.equal(stateBeforeTimeTravel.history.length);
        expect(stateAfterTimeTravel.history).to.eql(stateBeforeTimeTravel.history);
      });

      it('after playing a new valid move, all history after that move is discarded', () => {
        const midState = callPlaySquare(initialState, { boardIndex: 1, squareIndex: '8' });
        let stateBeforeTimeTravel = callPlaySquare(midState, { boardIndex: 8, squareIndex: '5' });
        stateBeforeTimeTravel = callPlaySquare(stateBeforeTimeTravel, {
          boardIndex: 5,
          squareIndex: '5',
        });

        const stateAfterTimeTravel = callTimeTravel(stateBeforeTimeTravel, { pointInHistory: 0 });
        const stateAfterValidMove = callPlaySquare(stateAfterTimeTravel, {
          boardIndex: 8,
          squareIndex: '3',
        });

        expect(stateAfterValidMove.history).to.be.lengthOf(2);
      });

      it('playing an invalid move, history is unchanged (already tested in tests marked with *)', () => {});
    });
  });

  describe('special icons', () => {
    [true, false].forEach(specialIcons => {
      it(`special icons action should toggle specialIcons state (${specialIcons})`, () => {
        initialState.specialIcons = specialIcons;
        deepFreeze(initialState);

        const newState = ultimateTicTacToe(initialState, toggleSpecialIcons());

        expect(newState.specialIcons).to.equal(!specialIcons);
      });
    });
  });
});

describe('calculateUltimateWinner', () => {
  it('should return null for initial empty boards', () => {
    const boards = Array(9)
      .fill()
      .map(() => ({ squares: emptySquares(), isActive: false }));
    expect(callCalculateUltimateWinner(boards)).to.be.null;
  });

  it('should return null if ony two boards won', () => {
    const boards = Array(9)
      .fill()
      .map(() => ({ squares: emptySquares(), isActive: false }));
    boards[1].squares = ['O', 'O', 'O', ...Array(6).fill(null)];
    boards[3].squares = [...Array(6).fill(null), 'O', 'O', 'O'];

    expect(callCalculateUltimateWinner(boards)).to.be.null;
  });

  it('should return null if top row of boards won, but by different players', () => {
    const boards = Array(9)
      .fill()
      .map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['X', 'X', 'X', ...Array(6).fill(null)];
    boards[1].squares = [...Array(6).fill(null), 'O', 'O', 'O'];
    boards[2].squares = ['X', null, null, null, 'X', null, null, null, 'X'];

    expect(callCalculateUltimateWinner(boards)).to.be.null;
  });

  it('should return X if X won top row of boards', () => {
    const boards = Array(9)
      .fill()
      .map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['X', 'X', 'X', ...Array(6).fill(null)];
    boards[1].squares = [...Array(6).fill(null), 'X', 'X', 'X'];
    boards[2].squares = ['X', null, null, null, 'X', null, null, null, 'X'];

    expect(callCalculateUltimateWinner(boards)).to.equal('X');
  });

  it('should return O if O won left column of boards', () => {
    const boards = Array(9)
      .fill()
      .map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['O', null, null, 'O', null, null, 'O', null, null];
    boards[3].squares = [null, null, 'O', null, 'O', null, 'O', null, null];
    boards[6].squares = [null, 'O', null, null, 'O', null, null, 'O', null];

    expect(callCalculateUltimateWinner(boards)).to.equal('O');
  });

  it('should return X if X won diagonal boards', () => {
    const boards = Array(9)
      .fill()
      .map(() => ({ squares: emptySquares(), isActive: false }));
    boards[0].squares = ['X', null, null, 'X', null, null, 'X', null, null];
    boards[4].squares = [null, null, 'X', null, 'X', null, 'X', null, null];
    boards[8].squares = [null, 'X', null, null, 'X', null, null, 'X', null];

    expect(callCalculateUltimateWinner(boards)).to.equal('X');
  });

  it('should return O if O won reverse diagonal boards', () => {
    const boards = Array(9)
      .fill()
      .map(() => ({ squares: emptySquares(), isActive: false }));
    boards[2].squares = ['O', null, null, 'O', null, null, 'O', null, null];
    boards[4].squares = [null, null, 'O', null, 'O', null, 'O', null, null];
    boards[6].squares = [null, 'O', null, null, 'O', null, null, 'O', null];

    expect(callCalculateUltimateWinner(boards)).to.equal('O');
  });

  it('should return X if X won diagonal, and one of won boards is full', () => {
    const boards = [
      { squares: ['X', 'O', 'O', 'X', 'O', 'X', 'X', 'X', 'O'], isActive: true },
      { squares: ['X', null, null, null, null, null, null, null, null], isActive: true },
      { squares: ['X', null, null, null, null, 'X', null, null, null], isActive: true },
      { squares: ['O', null, null, null, 'O', null, null, null, null], isActive: true },
      { squares: ['X', null, null, 'X', null, null, 'X', null, null], isActive: true },
      { squares: ['O', null, null, null, 'O', null, null, null, null], isActive: true },
      { squares: ['O', null, 'O', null, null, null, null, null, null], isActive: true },
      { squares: ['O', null, null, null, 'O', null, null, null, 'O'], isActive: true },
      { squares: ['X', null, null, null, 'X', null, null, null, 'X'], isActive: true },
    ];

    expect(callCalculateUltimateWinner(boards)).to.equal('X');
  });
});

function getBoardsExcept(boards, boardIndexes) {
  const boardIndexIntegers = boardIndexes.map(index => parseInt(index, 10));
  return boards.filter((board, index) => !boardIndexIntegers.includes(index));
}

function emptySquares() {
  return Array(9).fill(null);
}
