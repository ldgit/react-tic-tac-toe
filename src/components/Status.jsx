import React from 'react';
import { getPlayerEmblemClasses } from '../helpers';

export default function Status({ description, player, specialIcons = false }) {
  const playerIconClass = getPlayerEmblemClasses({ value: player, specialIcons });

  return (
    <div className="game-status" data-testid="gameStatus">
      {description}: <button className={playerIconClass} type="button" disabled>{player}</button>
    </div>
  );
}
