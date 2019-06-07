import { calculateWinner } from './helpers';

export function ultimateTicTacToe(state = getInitialState(), action) {
  switch (action.type) {
    case 'PLAY_SQUARE':
      return playSquare(state, {
        boardIndex: action.boardIndex,
        squareIndex: action.squareIndex,
      });
    case 'TIME_TRAVEL':
      return timeTravel(state, { pointInHistory: action.pointInHistory });
    case 'TOGGLE_SPECIAL_ICONS':
      return {
        ...state,
        specialIcons: !state.specialIcons,
      };
    default:
      return state;
  }
}

export function calculateUltimateWinner(boards) {
  const ultimateBoard = boards.map(board => calculateWinner(board.squares));

  return calculateWinner(ultimateBoard);
}

function playSquare(state, { boardIndex, squareIndex }) {
  if (calculateUltimateWinner(state.history[state.pointInHistory].boards)) {
    // game over
    return state;
  }
  if (!chosenSquareIsPlayable(state, boardIndex, squareIndex)) {
    // do nothing
    return state;
  }

  const { boards } = state.history[state.pointInHistory];
  const updatedBoards = boards
    .map(updateBoardSquares(boardIndex, squareIndex, state.nextPlayer))
    .map(updateBoardActiveStatus(boardIndex, squareIndex));

  const { history } = state;
  const newHistory = [
    ...history.slice(0, state.pointInHistory + 1),
    { boards: updatedBoards },
  ];

  return {
    ...state,
    nextPlayer: getNextPlayer(
      { boardIndex, squareIndex },
      updatedBoards,
      state,
    ),
    history: newHistory,
    pointInHistory: newHistory.length - 1,
  };
}

function chosenSquareIsPlayable(state, boardIndex, squareIndex) {
  const boardToPlay = state.history[state.pointInHistory].boards[boardIndex];

  return (
    boardToPlay.isActive &&
    boardToPlay.squares[squareIndex] === null &&
    !calculateWinner(boardToPlay.squares)
  );
}

function updateBoardSquares(playedBoardIndex, playedSquareIndex, player) {
  return (board, boardIndex) => {
    if (boardIndex === playedBoardIndex) {
      const { squares } = board;

      return {
        ...board,
        squares: [
          ...squares.slice(0, playedSquareIndex),
          player,
          ...squares.slice(+playedSquareIndex + 1),
        ],
      };
    }

    return board;
  };
}

function updateBoardActiveStatus(boardIndex, squareIndex) {
  return (board, index, boards) => {
    const isBoardActive = index === parseInt(squareIndex, 10);

    return {
      ...board,
      isActive: nextBoardIsWon(boards, { boardIndex, squareIndex })
        ? true
        : isBoardActive,
    };
  };
}

function timeTravel(state, { pointInHistory }) {
  return {
    ...state,
    pointInHistory,
    nextPlayer: pointInHistory % 2 === 0 ? 'X' : 'O',
  };
}

function getInitialState() {
  const boards = Array(9)
    .fill()
    .map(() => ({ squares: Array(9).fill(null), isActive: true }));

  return {
    nextPlayer: 'X',
    history: [{ boards }],
    pointInHistory: 0,
    specialIcons: false,
  };
}

function nextBoardIsWon(boards, { squareIndex }) {
  return !!calculateWinner(boards[squareIndex].squares);
}

function getNextPlayer(move, newBoards, oldState) {
  return oldState.nextPlayer === 'X' ? 'O' : 'X';
}
