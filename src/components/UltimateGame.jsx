import React from 'react';
import Board from './Board';
import Status from './Status';
import {
  calculateUltimateWinner,
  getColorClass,
} from '../helpers';
import Ultimate from '../game';

export default class UltimateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = Ultimate.getInitialState();
    this.jumpTo = this.jumpTo.bind(this);
  }

  getCurrentPlayer() {
    const { nextPlayer } = this.state;

    return nextPlayer;
  }

  handleClick(boardIndex, squareIndex) {
    this.setState(previousState => Ultimate.playSquare(previousState, { boardIndex, squareIndex }));
  }

  jumpTo(pointInHistory) {
    this.setState(previousState => Ultimate.timeTravel(previousState, { pointInHistory }));
  }

  renderBoard(boardIndex, boards, testId) {
    const currentBoard = boards[boardIndex];
    const boardClass = `board-cell ${getColorClass(currentBoard)}`;

    return (
      <Board
        className={boardClass}
        squares={currentBoard.squares}
        testId={testId}
        onClick={squareIndex => this.handleClick(boardIndex, squareIndex)}
      />
    );
  }

  render() {
    const { nextPlayer, history, pointInHistory } = this.state;
    const { boards } = history[pointInHistory];
    const winner = calculateUltimateWinner(boards);
    const status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

    return (
      <div>
        <div>
          {this.renderBoard(0, boards, 'topLeftBoard')}
          {this.renderBoard(1, boards, 'topMiddleBoard')}
          {this.renderBoard(2, boards, 'topRightBoard')}
        </div>
        <div>
          {this.renderBoard(3, boards, 'centerLeftBoard')}
          {this.renderBoard(4, boards, 'centerMiddleBoard')}
          {this.renderBoard(5, boards, 'centerRightBoard')}
        </div>
        <div>
          {this.renderBoard(6, boards, 'bottomLeftBoard')}
          {this.renderBoard(7, boards, 'bottomMiddleBoard')}
          {this.renderBoard(8, boards, 'bottomRightBoard')}
        </div>
        <div className="game-info">
          <Status gameInfo={status} />
          <ol>
            {history.map(renderTimeTravelButton.bind(null, this.jumpTo))}
          </ol>
        </div>
      </div>
    );
  }
}

function renderTimeTravelButton(onClickHandler, boardsObject, moveNumber) {
  const description = moveNumber === 0 ? 'Go to game start' : `Go to move ${moveNumber}`;
  return (
    <li>
      <button type="button" onClick={() => onClickHandler(moveNumber)}>{description}</button>
    </li>
  );
}
