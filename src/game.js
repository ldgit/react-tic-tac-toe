import { calculateWinner, calculateUltimateWinner } from './helpers';

const Ultimate = {
  playSquare, getInitialState, timeTravel, deepCopyGameState,
};

function playSquare(oldState, { boardIndex, squareIndex }) {
  const newState = deepCopyGameState(oldState);
  const newBoards = deepCopyGameBoards(newState.history[oldState.pointInHistory].boards);

  if (calculateUltimateWinner(newBoards)) { // game already finished
    return newState;
  }

  const boardToPlay = newBoards[boardIndex];
  const aValidSquareWasPlayed = boardToPlay.isActive
    && boardToPlay.squares[squareIndex] === null
    && !calculateWinner(boardToPlay.squares);

  if (!aValidSquareWasPlayed) {
    // Nothing changes in this case
    return newState;
  }

  // Needs to happen before deciding which board is active because it is used in that calculation
  boardToPlay.squares[squareIndex] = newState.nextPlayer;

  const newBoardsWithUpdatedActiveStatus = newBoards.map((board, index) => {
    const isBoardActive = index === parseInt(squareIndex, 10);

    return Object.assign({}, board, {
      isActive: nextBoardIsWon(newBoards, { boardIndex, squareIndex }) ? true : isBoardActive,
    });
  });

  newState.nextPlayer = getNextPlayer({ boardIndex, squareIndex }, newBoards, oldState);

  const newHistory = newState.history.slice(0, oldState.pointInHistory + 1);
  newHistory.push({ boards: newBoardsWithUpdatedActiveStatus });
  newState.history = newHistory;
  newState.pointInHistory = newHistory.length - 1;

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
    specialIcons: false,
  };
}

function timeTravel(oldState, { pointInHistory }) {
  const newState = deepCopyGameState(oldState);
  newState.pointInHistory = pointInHistory;
  newState.nextPlayer = pointInHistory % 2 === 0 ? 'X' : 'O';

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
  return oldState.nextPlayer === 'X' ? 'O' : 'X';
}

export default Ultimate;
