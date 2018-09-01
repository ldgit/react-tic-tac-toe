import assert from 'assert';
import React from 'react';
import ReactDom from 'react-dom';
import { JSDOM } from 'jsdom';
import Game from '../src/components/Game';

describe('Tic-tac-toe game', () => {
  let document;
  let app;
  let window;

  beforeEach(() => {
    ({ window } = new JSDOM(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Tic-Tac-Toe</title>
      </head>
      <body></body>
    </html>`));
    ({ document } = window);
    app = document.createElement('div');
    document.body.appendChild(app);
    // eslint-disable-next-line react/jsx-filename-extension
    ReactDom.render(<Game />, app);
  });

  context('standard tic-tac-toe', () => {
    it('clicking on already played square does nothing', () => {
      clickEmptySquare(sel(app, 'centerMiddleSquare'));

      click(sel(app, 'centerMiddleSquare'));

      assert.equal(sel(app, 'gameStatus').textContent, 'Next player: O');
      assert.equal(sel(app, 'centerMiddleSquare').textContent, 'X');
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
  });

  context('ultimate tic-tac-toe', () => {
    it.skip('simple X win', () => {});
    it('simple O win');
    it('simple draw');
    it('simple time travel (X wins, then back three turns, then O wins)');
    it('complex X win (with O winning two boards)');
    it('when a local board is won, disable further input on it');
    it('time travel re-enables previously won local-board');
    it('when game is won, disable further inputs on all local boards');
    it('time travel after game was won reenables relevant local boards');
  });

  function clickEmptySquare(square) {
    assert.equal(square.textContent, '', 'square that should be empty is not');
    click(square);

    return {
      assertIsFilledWith: symbol => assert.equal(
        square.textContent, symbol, `square not filled with expected symbol "${symbol}"`,
      ),
    };
  }

  function selectByText(container, selector, text) {
    const elements = Array.from(container.querySelectorAll(selector)).filter(element => element.textContent === text);

    return elements.length > 0 ? elements[0] : null;
  }

  function click(element) {
    const event = new window.MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
  }

  function assertGameStatus(statusType, player) {
    assert.equal(sel(app, 'gameStatus').textContent, `${statusType}: ${player}`);
  }
});

function sel(container, testId) {
  const element = container.querySelector(`[data-testid="${testId}"]`);
  assert.ok(element, `element with data-testid "${testId}" not found`);

  return element;
}
