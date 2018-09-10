import React from 'react';
import Board from './Board';
import Status from './Status';
import TimeTravelButton from './TimeTravelButton';
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
    this.toggleSpecialIcons = this.toggleSpecialIcons.bind(this);
  }

  handleClick(boardIndex, squareIndex) {
    this.setState(previousState => Ultimate.playSquare(previousState, { boardIndex, squareIndex }));
  }

  jumpTo(pointInHistory) {
    this.setState(previousState => Ultimate.timeTravel(previousState, { pointInHistory }));
  }

  toggleSpecialIcons() {
    const { specialIcons } = this.state;

    this.setState({ specialIcons: !specialIcons });
  }

  renderBoard(boardIndex, boards, testId) {
    const currentBoard = boards[boardIndex];
    const boardClass = `table-cell table-board-border ${getColorClass(currentBoard)}`;
    const { specialIcons } = this.state;

    return (
      <Board
        className={boardClass}
        squares={currentBoard.squares}
        testId={testId}
        onClick={squareIndex => this.handleClick(boardIndex, squareIndex)}
        specialIcons={specialIcons}
      />
    );
  }

  render() {
    const {
      nextPlayer, history, pointInHistory, specialIcons,
    } = this.state;
    const { boards } = history[pointInHistory];
    const winner = calculateUltimateWinner(boards);

    return (
      <div className="table">
        <div className="table-cell">
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
        </div>
        <div className="game-info table-cell table-large-padding">
          <Status
            description={winner ? 'Winner' : 'Next player'}
            player={winner || nextPlayer}
            specialIcons={specialIcons}
          />
          <br />
          <button type="button" onClick={this.toggleSpecialIcons}>Vue vs. React?</button>
          <br />
          <ol>
            {history.map(renderTimeTravelButton.bind(null, this.jumpTo, pointInHistory))}
          </ol>
        </div>
      </div>
    );
  }
}

function renderTimeTravelButton(onClickHandler, pointInHistory, boardsObject, moveNumber) {
  const description = moveNumber === 0 ? 'Go to game start' : `Go to move ${moveNumber}`;

  return (
    <li key={moveNumber}>
      <TimeTravelButton onClick={() => onClickHandler(moveNumber)} highlight={pointInHistory === moveNumber}>
        {description}
      </TimeTravelButton>
    </li>
  );
}
