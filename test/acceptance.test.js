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

      assert.equal(sel(app, 'gameStatus').textContent, 'Winner: X');
    });

    it('should update game status with next player info after each move', () => {
      assert.equal(sel(app, 'gameStatus').textContent, 'Next player: X');
      clickEmptySquare(sel(app, 'centerMiddleSquare'));
      assert.equal(sel(app, 'gameStatus').textContent, 'Next player: O');
      clickEmptySquare(sel(app, 'topRightSquare'));
      assert.equal(sel(app, 'gameStatus').textContent, 'Next player: X');
    });

    it('horizontal O win');
    it('vertical X win');

    it('click on already played square does nothing', () => {
      clickEmptySquare(sel(app, 'centerMiddleSquare'));

      click(sel(app, 'centerMiddleSquare'));

      assert.equal(sel(app, 'gameStatus').textContent, 'Next player: O');
      assert.equal(sel(app, 'centerMiddleSquare').textContent, 'X');
    });
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
    assert.equal(square.textContent, '');
    click(square);

    return {
      assertIsFilledWith: symbol => assert.equal(square.textContent, symbol),
    };
  }

  function click(element) {
    const event = new window.MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
  }
});

function sel(container, testId) {
  const element = container.querySelector(`[data-testid="${testId}"]`);
  assert.ok(element, `element with data-testid "${testId}" not found`);

  return element;
}
