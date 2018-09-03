import React from 'react';

export default function Status({ gameInfo }) {
  return <div className="game-status" data-testid="gameStatus">{gameInfo}</div>;
}
