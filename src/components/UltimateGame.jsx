import React, { useState, useEffect } from 'react';
import Board from './Board';
import Status from './Status';
import SaveAndLoad from './SaveAndLoad';
import ShareGame from './ShareGame';
import TimeTravelButton from './TimeTravelButton';
import useReadStateFromUrl from './useReadStateFromUrl';
import { historyToActions, actionsToState } from '../url-query-state';
import { getColorClass } from '../helpers';
import { ultimateTicTacToe, calculateUltimateWinner } from '../ultimate-game';
import { playSquare, timeTravel, toggleSpecialIcons } from '../actions';

export default function UltimateGame() {
  const [state, setState] = useState(ultimateTicTacToe(undefined, ''));
  const [replayInProgress, setReplayInProgress] = useState(false);
  const [currentAction, setCurrentAction] = useState(0);
  const [historyToReplay, setHistoryToReplay] = useState(null);

  useEffect(() => {
    if (!replayInProgress) {
      return;
    }

    setTimeout(() => {
      const actions = historyToActions(historyToReplay).slice(0, currentAction);
      if (currentAction >= historyToReplay.length) {
        setReplayInProgress(false);
        return;
      }

      setState(actionsToState(actions));
      setCurrentAction(previousAction => previousAction + 1);
    }, 1000);
  }, [replayInProgress, currentAction, historyToReplay]);

  useReadStateFromUrl(setState);

  function handleClick(boardIndex, squareIndex) {
    setState(ultimateTicTacToe(state, playSquare(boardIndex, squareIndex)));
  }

  function jumpTo(pointInHistory) {
    setState(ultimateTicTacToe(state, timeTravel(pointInHistory)));
  }

  function toggleIcons() {
    setState(ultimateTicTacToe(state, toggleSpecialIcons()));
  }

  function loadGame(gameStateToLoad) {
    setState(gameStateToLoad);
  }

  function replayGame() {
    setHistoryToReplay(state.history);
    setReplayInProgress(true);
    setCurrentAction(0);
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
        <button
          type="button"
          className="button specialIconsButton"
          onClick={toggleIcons}
        >
          {specialIcons ? 'X vs. O' : 'Vue vs. React'}
        </button>
        <button type="button" className="button" onClick={replayGame}>
          Replay game
        </button>
        <br />
        <br />
        <ShareGame gameState={state} />
        <br />
        <br />
        <SaveAndLoad gameState={state} onLoadGameClick={loadGame} />
        <br />
        <ol className="history">
          {history.map(
            renderTimeTravelButton.bind(null, jumpTo, pointInHistory),
          )}
        </ol>
        <p>
          <a
            href="https://github.com/ldgit/react-tic-tac-toe/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report bugs here
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/ldgit/react-tic-tac-toe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source on Github
          </a>
        </p>
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
