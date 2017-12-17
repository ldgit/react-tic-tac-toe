import React from 'react';
import Square from './Square';
import calculateWinner from './../helpers';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  getNextValue() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  handleClick(i) {
    if (calculateWinner(this.state.squares) || this.state.squares[i]) {
      return;
    }

    const squares = this.state.squares.slice();
    squares[i] = this.getNextValue();
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${this.getNextValue()}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare('0')}
          {this.renderSquare('1')}
          {this.renderSquare('2')}
        </div>
        <div className="board-row">
          {this.renderSquare('3')}
          {this.renderSquare('4')}
          {this.renderSquare('5')}
        </div>
        <div className="board-row">
          {this.renderSquare('6')}
          {this.renderSquare('7')}
          {this.renderSquare('8')}
        </div>
      </div>
    );
  }
}
