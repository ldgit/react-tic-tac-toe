import { playSquare } from './actions';

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

export function actionsToQueryString() {}

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
