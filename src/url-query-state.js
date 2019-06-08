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
      const firstItemBoards = historyItem.boards;
      const secondItemBoards = fullHistory[historyItemIndex + 1].boards;
      const action = firstItemBoards.reduce(
        (previousAction, board, boardIndex) => {
          if (previousAction !== null) {
            return previousAction;
          }

          let newAction = null;
          board.squares.forEach((square, squareIndex) => {
            if (secondItemBoards[boardIndex].squares[squareIndex] !== square) {
              newAction = playSquare(boardIndex, squareIndex);
            }
          });

          return newAction;
        },
        null,
      );

      actions.push(action);

      return actions;
    },
    [],
  );
}

export function foo() {}
