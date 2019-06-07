import React, { useState } from 'react';
import Board from './Board';
import Status from './Status';
import SaveAndLoad from './SaveAndLoad';
import TimeTravelButton from './TimeTravelButton';
import { getColorClass } from '../helpers';
import { ultimateTicTacToe, calculateUltimateWinner } from '../ultimate-game';

export default function UltimateGame() {
  const [state, setState] = useState(ultimateTicTacToe(undefined, ''));

  function handleClick(boardIndex, squareIndex) {
    setState(ultimateTicTacToe(state, { type: 'PLAY_SQUARE', boardIndex, squareIndex }));
  }

  function jumpTo(pointInHistory) {
    setState(ultimateTicTacToe(state, { type: 'TIME_TRAVEL', pointInHistory }));
  }

  function toggleSpecialIcons() {
    setState(ultimateTicTacToe(state, { type: 'TOGGLE_SPECIAL_ICONS' }));
  }

  function loadGame(gameStateToLoad) {
    setState(gameStateToLoad);
  }

  function renderBoard(boardIndex, boards, testId) {
    const currentBoard = boards[boardIndex];
    const boardClass = `classic-board ${getColorClass(currentBoard)}`;
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
    <>
      <div className="ultimate-board">
        {renderBoard(0, boards, 'topLeftBoard')}
        {renderBoard(1, boards, 'topMiddleBoard')}
        {renderBoard(2, boards, 'topRightBoard')}
        {renderBoard(3, boards, 'centerLeftBoard')}
        {renderBoard(4, boards, 'centerMiddleBoard')}
        {renderBoard(5, boards, 'centerRightBoard')}
        {renderBoard(6, boards, 'bottomLeftBoard')}
        {renderBoard(7, boards, 'bottomMiddleBoard')}
        {renderBoard(8, boards, 'bottomRightBoard')}
      </div>
      <div className="game-info">
        <Status
          description={winner ? 'Winner' : 'Next player'}
          player={winner || nextPlayer}
          specialIcons={specialIcons}
        />
        <br />
        <button type="button" className="button" onClick={toggleSpecialIcons}>
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
    </>
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
