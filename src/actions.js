export const PLAY_SQUARE = 'PLAY_SQUARE';
export const TIME_TRAVEL = 'TIME_TRAVEL';
export const TOGGLE_SPECIAL_ICONS = 'TOGGLE_SPECIAL_ICONS';

export function playSquare(boardIndex, squareIndex) {
  return {
    type: PLAY_SQUARE,
    boardIndex: parseInt(boardIndex, 10),
    squareIndex: parseInt(squareIndex, 10),
  };
}

export function timeTravel(pointInHistory) {
  return { type: TIME_TRAVEL, pointInHistory };
}

export function toggleSpecialIcons() {
  return { type: TOGGLE_SPECIAL_ICONS };
}
