import React, { useState } from 'react';
import Board from './Board';
import Status from './Status';
import SaveAndLoad from './SaveAndLoad';
import TimeTravelButton from './TimeTravelButton';
import { getColorClass } from '../helpers';
import {
  getInitialState,
  playSquare,
  timeTravel,
  calculateUltimateWinner,
} from '../ultimate-game';

export default function UltimateGame() {
  const [state, setState] = useState(getInitialState());

  function handleClick(boardIndex, squareIndex) {
    setState(playSquare(state, { boardIndex, squareIndex }));
  }

  function jumpTo(pointInHistory) {
    setState(timeTravel(state, { pointInHistory }));
  }

  function toggleSpecialIcons() {
    setState({ ...state, specialIcons: !state.specialIcons });
  }

  function loadGame(gameStateToLoad) {
    setState(gameStateToLoad);
  }

  function renderBoard(boardIndex, boards, testId) {
    const currentBoard = boards[boardIndex];
    const boardClass = `table-cell table-board-border ${getColorClass(
      currentBoard,
    )}`;
    const { specialIcons } = state;

    return (
      <Board
        className={boardClass}
        squares={currentBoard.squares}
        testId={testId}
        onClick={squareIndex => handleClick(boardIndex, squareIndex)}
        specialIcons={specialIcons}
      />
    );
  }

  const { nextPlayer, history, pointInHistory, specialIcons } = state;
  const { boards } = history[pointInHistory];
  const winner = calculateUltimateWinner(boards);

  return (
    <div className="container">
      <div className="ultimate-board">
        <div className="ultimate-row">
          {renderBoard(0, boards, 'topLeftBoard')}
          {renderBoard(1, boards, 'topMiddleBoard')}
          {renderBoard(2, boards, 'topRightBoard')}
        </div>
        <div className="ultimate-row">
          {renderBoard(3, boards, 'centerLeftBoard')}
          {renderBoard(4, boards, 'centerMiddleBoard')}
          {renderBoard(5, boards, 'centerRightBoard')}
        </div>
        <div className="ultimate-row">
          {renderBoard(6, boards, 'bottomLeftBoard')}
          {renderBoard(7, boards, 'bottomMiddleBoard')}
          {renderBoard(8, boards, 'bottomRightBoard')}
        </div>
      </div>
      <div className="game-info table-cell table-large-padding max-height">
        <Status
          description={winner ? 'Winner' : 'Next player'}
          player={winner || nextPlayer}
          specialIcons={specialIcons}
        />
        <br />
        <button type="button" onClick={toggleSpecialIcons}>
          Vue vs. React?
        </button>
        <br />
        <br />
        <SaveAndLoad gameState={state} onLoadGameClick={loadGame} />
        <br />
        <ol className="history">
          {history.map(
            renderTimeTravelButton.bind(null, jumpTo, pointInHistory),
          )}
        </ol>
      </div>
    </div>
  );
}

function renderTimeTravelButton(
  onClickHandler,
  pointInHistory,
  boardsObject,
  moveNumber,
) {
  const description =
    moveNumber === 0 ? 'Go to game start' : `Go to move ${moveNumber}`;

  return (
    <li key={moveNumber}>
      <TimeTravelButton
        onClick={() => onClickHandler(moveNumber)}
        highlight={pointInHistory === moveNumber}
      >
        {description}
      </TimeTravelButton>
    </li>
  );
}
