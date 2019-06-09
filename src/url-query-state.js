import { playSquare, toggleSpecialIcons, PLAY_SQUARE } from './actions';
import { getInitialState, ultimateTicTacToe } from './ultimate-game';

export function historyToActions(history) {
  if (history.length < 2) {
    return [];
  }

  return history.reduce(
    (actions, historyItem, historyItemIndex, fullHistory) => {
      if (typeof fullHistory[historyItemIndex + 1] === 'undefined') {
        return actions;
      }

      const action = getHistoryItemsDiffAsAction(
        historyItem.boards,
        fullHistory[historyItemIndex + 1].boards,
      );
      actions.push(action);

      return actions;
    },
    [],
  );
}

export function actionsToQueryString(actions) {
  if (actions.length === 0) {
    return '';
  }

  return actions
    .map(action =>
      action.type === PLAY_SQUARE
        ? `a[]=p${action.boardIndex}${action.squareIndex}`
        : 'a[]=ti',
    )
    .join('&');
}

export function queryStringToActions(queryString) {
  if (!queryString) {
    return [];
  }

  return queryString
    .split('&')
    .filter(queryItem => queryItem.indexOf('a[]=') === 0)
    .map(queryItem => queryItem.split('=')[1])
    .map(queryItemValue =>
      queryItemValue === 'ti'
        ? toggleSpecialIcons()
        : playSquare(queryItemValue[1], queryItemValue[2]),
    );
}

export function actionsToState(actions) {
  // This is why they call them reducers ;)
  return actions.reduce(ultimateTicTacToe, getInitialState());
}

function getHistoryItemsDiffAsAction(
  firstHistoryItemBoards,
  secondHistoryItemBoards,
) {
  return firstHistoryItemBoards.reduce((previousAction, board, boardIndex) => {
    if (previousAction !== null) {
      return previousAction;
    }

    let newAction = null;
    board.squares.forEach((square, squareIndex) => {
      if (secondHistoryItemBoards[boardIndex].squares[squareIndex] !== square) {
        newAction = playSquare(boardIndex, squareIndex);
      }
    });

    return newAction;
  }, null);
}
