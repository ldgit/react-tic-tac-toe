import React from 'react';
import Board from './Board';
import Status from './Status';
import {
  calculateWinner,
  calculateUltimateWinner,
  markInactiveAndInactiveBoards,
  getColorClass,
  jumpToPointInHistory,
} from '../helpers';

export default class UltimateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          // What's with the map? See https://stackoverflow.com/a/35578536
          boards: Array(9).fill().map(() => ({ squares: Array(9).fill(null), isActive: true })),
        },
      ],
      moveNumber: 0,
      xIsNext: true,
    };
  }

  getCurrentPlayer() {
    const { xIsNext } = this.state;

    return xIsNext ? 'X' : 'O';
  }

  handleClick(boardIndex, squareIndex) {
    const { xIsNext, history, moveNumber } = this.state;
    const gameHistory = history.slice(0, moveNumber + 1);
    const { boards } = gameHistory[gameHistory.length - 1];

    if (calculateUltimateWinner(boards)) {
      return;
    }

    if (!boards[boardIndex].isActive) {
      return;
    }

    const newBoards = boards.slice();
    if (newBoards[boardIndex].squares[squareIndex]) {
      return;
    }

    if (calculateWinner(newBoards[boardIndex].squares)) {
      return;
    }

    const squares = newBoards[boardIndex].squares.slice();
    squares[squareIndex] = this.getCurrentPlayer();

    // BUG: Modifies state of the previous original history element
    console.error('before', gameHistory[gameHistory.length - 1].boards[boardIndex].squares);
    newBoards[boardIndex].squares = squares;
    console.error('after', gameHistory[gameHistory.length - 1].boards[boardIndex].squares);


    this.setState({
      history: gameHistory.concat([{ boards: markInactiveAndInactiveBoards(newBoards, squareIndex) }]),
      moveNumber: gameHistory.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(moveNumber) {
    this.setState(previousState => jumpToPointInHistory(previousState, moveNumber));
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
    const { history, xIsNext, moveNumber } = this.state;
    const { boards } = history[moveNumber];
    const winner = calculateUltimateWinner(boards);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

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
            {history.map(renderTimeTravelButton.bind(null, this.jumpTo.bind(this)))}
          </ol>
        </div>
      </div>
    );
  }
}


function renderTimeTravelButton(onClickHandler, boards, moveNumber) {
  const description = moveNumber === 0 ? 'Go to game start' : `Go to move ${moveNumber}`;
  return (
    <li>
      <button type="button" onClick={() => onClickHandler(moveNumber)}>{description}</button>
    </li>
  );
}
