import assert from 'assert';
import { expect } from 'chai';
import React from 'react';
import ReactDom from 'react-dom';
import Game from '../src/components/Game';
import { sel, clickOnElement, selectByText, assertFilledWith } from './test-utils';

describe('Classic Tic-tac-toe game', () => {
  let app;
  let click;

  beforeEach(() => {
    app = document.createElement('div');
    document.body.appendChild(app);
    click = clickOnElement.bind(null, window);
    // eslint-disable-next-line react/jsx-filename-extension
    ReactDom.render(<Game />, app);
  });

  it('clicking on already played square does nothing', () => {
    clickEmptySquare(sel(app, 'centerMiddleSquare'));

    click(sel(app, 'centerMiddleSquare'));

    assertGameStatus('Next player', 'O');
    assertFilledWith(sel(app, 'centerMiddleSquare'), 'X');
  });

  it('play a game where X wins', () => {
    // Final board
    // X O O
    // O X
    // X   X
    clickEmptySquare(sel(app, 'centerMiddleSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'topMiddleSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(app, 'bottomLeftSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'topRightSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(app, 'topLeftSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'centerLeftSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(app, 'bottomRightSquare')).assertIsFilledWith('X');
  });

  it('should update game status with next player info after each move', () => {
    assertGameStatus('Next player', 'X');
    clickEmptySquare(sel(app, 'centerMiddleSquare'));
    assertGameStatus('Next player', 'O');
    clickEmptySquare(sel(app, 'topRightSquare'));
    assertGameStatus('Next player', 'X');
  });

  it('horizontal O win', () => {
    // Final board
    // O O O
    //   X
    // X   X
    clickEmptySquare(sel(app, 'centerMiddleSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'topMiddleSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(app, 'bottomRightSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'topRightSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(app, 'bottomLeftSquare')).assertIsFilledWith('X');

    assertGameStatus('Next player', 'O');
    clickEmptySquare(sel(app, 'topLeftSquare')).assertIsFilledWith('O');
    assertGameStatus('Winner', 'O');
  });

  it('middle vertical X win', () => {
    playMiddleVerticalXWin();
    assertGameStatus('Winner', 'X');
  });

  it('clicking on empty square after winning move does nothing', () => {
    // Final board
    // O O O
    //   X
    // X   X
    clickEmptySquare(sel(app, 'centerMiddleSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'topMiddleSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(app, 'bottomRightSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'topRightSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(app, 'bottomLeftSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'topLeftSquare')).assertIsFilledWith('O');

    clickEmptySquare(sel(app, 'centerLeftSquare')).assertIsFilledWith('');
    clickEmptySquare(sel(app, 'bottomMiddleSquare')).assertIsFilledWith('');
  });

  it('time travel: highlight time travel button for current move', () => {
    expect(selectByText(app, 'button', 'Go to game start').className).to.have.string(
      'current-move-button',
    );
    clickEmptySquare(sel(app, 'centerMiddleSquare')).assertIsFilledWith('X');
    expect(selectByText(app, 'button', 'Go to game start').className).to.not.have.string(
      'current-move-button',
    );
    expect(selectByText(app, 'button', 'Go to move 1').className).to.have.string(
      'current-move-button',
    );

    click(selectByText(app, 'button', 'Go to game start'));
    expect(selectByText(app, 'button', 'Go to game start').className).to.have.string(
      'current-move-button',
    );
    expect(selectByText(app, 'button', 'Go to move 1').className).to.not.have.string(
      'current-move-button',
    );
  });

  it('time travel: X wins, then time travel two moves back, then O wins', () => {
    playMiddleVerticalXWin();
    assertGameStatus('Winner', 'X');

    click(selectByText(app, 'button', 'Go to move 3'));
    assertGameStatus('Next player', 'O');
    // Board now:
    // O X
    //   X
    //
    clickEmptySquare(sel(app, 'centerLeftSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(app, 'topRightSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'bottomLeftSquare')).assertIsFilledWith('O');
    assertGameStatus('Winner', 'O');
  });

  function playMiddleVerticalXWin() {
    // Final board
    // O X
    //   X
    // O X
    clickEmptySquare(sel(app, 'centerMiddleSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'topLeftSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(app, 'topMiddleSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(app, 'bottomLeftSquare')).assertIsFilledWith('O');

    assertGameStatus('Next player', 'X');
    clickEmptySquare(sel(app, 'bottomMiddleSquare')).assertIsFilledWith('X');
  }

  function clickEmptySquare(square) {
    assert.equal(square.textContent, '', 'square that should be empty is not');
    click(square);

    return {
      assertIsFilledWith: symbol => assertFilledWith(square, symbol),
    };
  }

  function assertGameStatus(statusType, player) {
    expect(sel(app, 'gameStatus').textContent).to.have.string(statusType);
    expect(sel(app, 'gameStatus').querySelector('button').textContent).to.equal(player);
  }
});
