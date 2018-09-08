import { calculateWinner, calculateUltimateWinner } from './helpers';

const Ultimate = {
  playSquare, getInitialState, timeTravel, deepCopyGameState,
};

function playSquare(oldState, { boardIndex, squareIndex }) {
  const newState = deepCopyGameState(oldState);
  const currentBoards = newState.history[newState.history.length - 1].boards;

  if (calculateUltimateWinner(currentBoards)) {
    return newState;
  }

  let aSquareWasPlayed = false;
  const boardToPlay = currentBoards[boardIndex];
  if (boardToPlay.isActive && boardToPlay.squares[squareIndex] === null && !calculateWinner(boardToPlay.squares)) {
    aSquareWasPlayed = true;
    boardToPlay.squares[squareIndex] = newState.nextPlayer;
  }

  if (!aSquareWasPlayed) {
    // Nothing changes in this case
    return newState;
  }

  const boardsWithUpdatedActiveStatus = currentBoards.map((board, index) => {
    const isBoardActive = index === parseInt(squareIndex, 10);

    // write a test for immutability
    return Object.assign(board, {
      isActive: nextBoardIsWon(currentBoards, { boardIndex, squareIndex }) ? true : isBoardActive,
    });
  });

  newState.history.push({ boards: boardsWithUpdatedActiveStatus });

  newState.nextPlayer = getNextPlayer({ boardIndex, squareIndex }, currentBoards, oldState);
  if (aSquareWasPlayed) {
    newState.history = newState.history.slice(0, oldState.pointInHistory);
    newState.history.push({ boards: currentBoards });
    newState.pointInHistory += 1;
  }

  return newState;
}

function getInitialState() {
  const boards = Array(9).fill().map(() => (
    { squares: Array(9).fill(null), isActive: true }
  ));

  return {
    nextPlayer: 'X',
    history: [{ boards }],
    pointInHistory: 0,
  };
}

function timeTravel(oldState, { pointInHistory }) {
  const newState = deepCopyGameState(oldState);
  const timeTravelPoint = pointInHistory;
  const currentPointInHistory = oldState.pointInHistory;

  if (currentPointInHistory <= timeTravelPoint) {
    const travelBackToLastMove = oldState.history.length === timeTravelPoint;

    if (!travelBackToLastMove) {
      newState.boards = newState.history[timeTravelPoint];
      newState.pointInHistory = timeTravelPoint;
      newState.nextPlayer = timeTravelPoint % 2 === 0 ? 'X' : 'O';
    }
    return newState;
  }

  newState.pointInHistory = timeTravelPoint;
  newState.nextPlayer = timeTravelPoint % 2 === 0 ? 'X' : 'O';

  return newState;
}

function deepCopyGameState(state) {
  const newHistory = state.history.map(boardEntry => ({ boards: deepCopyGameBoards(boardEntry.boards) }));

  return Object.assign({}, state, {
    nextPlayer: state.nextPlayer,
    history: newHistory,
  });
}

function deepCopyGameBoards(boards) {
  return boards.map(board => Object.assign({}, board, { isActive: board.isActive, squares: board.squares.slice() }));
}

function nextBoardIsWon(boards, { squareIndex }) {
  return !!calculateWinner(boards[squareIndex].squares);
}

function getNextPlayer(move, newBoards, oldState) {
  if (playedSquareUnchanged(newBoards, oldState.history[oldState.history.length - 1].boards, move)) {
    return oldState.nextPlayer;
  }

  return oldState.nextPlayer === 'X' ? 'O' : 'X';
}

function playedSquareUnchanged(newBoards, oldBoards, move) {
  const { boardIndex, squareIndex } = move;
  return newBoards[boardIndex].squares[squareIndex] === oldBoards[boardIndex].squares[squareIndex];
}

export default Ultimate;
