import React from 'react';
import Board from './Board';
import Status from './Status';
import { calculateWinner, calculateUltimateWinner, markInactiveAndInactiveBoards } from '../helpers';

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
      xIsNext: true,
    };
  }

  getCurrentPlayer() {
    const { xIsNext } = this.state;

    return xIsNext ? 'X' : 'O';
  }

  handleClick(boardIndex, squareIndex) {
    const { xIsNext, history } = this.state;
    const { boards } = history[0];

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

    newBoards[boardIndex].squares[squareIndex] = this.getCurrentPlayer();

    this.setState({
      history: [{ boards: markInactiveAndInactiveBoards(newBoards, squareIndex) }],
      xIsNext: !xIsNext,
    });
  }

  renderBoard(boardIndex, boards, testId) {
    return (
      <Board
        className="board-cell"
        squares={boards[boardIndex].squares}
        testId={testId}
        onClick={squareIndex => this.handleClick(boardIndex, squareIndex)}
      />
    );
  }

  render() {
    const { history, xIsNext } = this.state;
    const { boards } = history[0];

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
        </div>
      </div>
    );
  }
}
