import React from 'react';
import Title from './Title';
import Board from './Board';
import calculateWinner from './../helpers';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) },
      ],
      xIsNext: true,
    };
  }

  getNextValue() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  getLastPlayedSquares() {
    const { squares } = this.state.history[this.state.history.length - 1];

    return squares;
  }

  handleClick(i) {
    const squares = this.getLastPlayedSquares();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = this.getNextValue();
    this.state.history.push({ squares: newSquares });

    this.setState({
      history: this.state.history,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const squares = this.getLastPlayedSquares();
    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${this.getNextValue()}`;

    return (
      <div>
        <Title name="React" />
        <div className="game">
          <div className="game-board">
            <Board status={status} squares={squares} onClick={i => this.handleClick(i)} />
          </div>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
