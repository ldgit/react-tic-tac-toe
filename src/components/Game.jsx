import React from 'react';
import Board from './Board';
import Status from './Status';
import { calculateWinner } from '../helpers';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  getNextValue() {
    const { xIsNext } = this.state;

    return xIsNext ? 'X' : 'O';
  }

  jumpTo(step) {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  }

  handleClick(i) {
    const { xIsNext, history, stepNumber } = this.state;
    const gameHistory = history.slice(0, stepNumber + 1);
    const { squares } = gameHistory[gameHistory.length - 1];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = this.getNextValue();

    this.setState({
      history: gameHistory.concat([{ squares: newSquares }]),
      stepNumber: gameHistory.length,
      xIsNext: !xIsNext,
    });
  }

  render() {
    const { history, stepNumber } = this.state;
    const { squares } = history[stepNumber];
    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${this.getNextValue()}`;
    const moves = history.map((step, moveIndex) => {
      const description = moveIndex ? `Go to move ${moveIndex}` : 'Go to game start';
      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={moveIndex}>
          <button type="button" onClick={() => { this.jumpTo(moveIndex); }}>{description}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <Status gameInfo={status} />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
