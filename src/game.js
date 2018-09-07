import { calculateWinner, calculateUltimateWinner } from './helpers';

const Ultimate = { playSquare, getInitialState };

function playSquare(oldState, { boardIndex, squareIndex }) {
  const newState = deepCopyGameState(oldState);

  if (calculateUltimateWinner(oldState.boards)) {
    return newState;
  }

  let aSquareWasPlayed = false;
  const boardToPlay = newState.boards[boardIndex];
  if (boardToPlay.squares[squareIndex] === null && !calculateWinner(boardToPlay.squares) && boardToPlay.isActive) {
    aSquareWasPlayed = true;
    boardToPlay.squares[squareIndex] = newState.nextPlayer;
  }

  newState.boards = newState.boards.map((board, index) => {
    if (currentBoardIsInactive(oldState.boards, { boardIndex, squareIndex })) {
      return board;
    }

    const isBoardActive = aSquareWasPlayed ? index === parseInt(squareIndex, 10) : board.isActive;

    return Object.assign(board, {
      isActive: nextBoardIsWon(newState.boards, { boardIndex, squareIndex }) ? true : isBoardActive,
    });
  });

  newState.nextPlayer = getNextPlayer({ boardIndex, squareIndex }, newState.boards, oldState);

  return newState;
}

function getInitialState() {
  return {
    nextPlayer: 'X',
    boards: Array(9).fill().map(() => (
      { squares: Array(9).fill(null), isActive: true }
    )),
    history: [],
  };
}

function deepCopyGameState(state) {
  const newBoards = state.boards
    .map(board => Object.assign({}, board, { isActive: board.isActive, squares: board.squares.slice() }));

  return Object.assign({}, state, {
    boards: newBoards,
    nextPlayer: state.nextPlayer,
  });
}

function nextBoardIsWon(boards, { squareIndex }) {
  return !!calculateWinner(boards[squareIndex].squares);
}

function currentBoardIsInactive(boards, { boardIndex }) {
  return !boards[boardIndex].isActive;
}

function getNextPlayer(move, newBoards, oldState) {
  if (playedSquareUnchanged(newBoards, oldState.boards, move)) {
    return oldState.nextPlayer;
  }

  return oldState.nextPlayer === 'X' ? 'O' : 'X';
}

function playedSquareUnchanged(newBoards, oldBoards, move) {
  const { boardIndex, squareIndex } = move;
  return newBoards[boardIndex].squares[squareIndex] === oldBoards[boardIndex].squares[squareIndex];
}

export default Ultimate;
