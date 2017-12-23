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

  getLastPlayedSquares(history) {
    return history[this.state.history.length - 1].squares;
  }

  handleClick(i) {
    const { history } = this.state;
    const squares = this.getLastPlayedSquares(history);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = this.getNextValue();

    this.setState({
      history: history.concat([{ squares: newSquares }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const squares = this.getLastPlayedSquares(this.state.history);
    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${this.getNextValue()}`;

    return (
      <div>
        <Title name="React" />
        <div className="game">
          <div className="game-board">
            <Board squares={squares} onClick={i => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      </div>
    );
  }
}
