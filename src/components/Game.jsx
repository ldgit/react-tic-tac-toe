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
      stepNumber: 0,
      xIsNext: true,
    };
  }

  getNextValue() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  jumpTo(step) {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const { squares } = history[history.length - 1];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = this.getNextValue();

    this.setState({
      history: history.concat([{ squares: newSquares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const { squares } = this.state.history[this.state.stepNumber];
    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${this.getNextValue()}`;
    const moves = this.state.history.map((step, moveIndex) => {
      const description = moveIndex ? `Go to move ${moveIndex}` : 'Go to game start';
      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={moveIndex}>
          <button onClick={() => { this.jumpTo(moveIndex); }}>{description}</button>
        </li>
      );
    });

    return (
      <div>
        <Title name="React" />
        <div className="game">
          <div className="game-board">
            <Board squares={squares} onClick={i => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}
