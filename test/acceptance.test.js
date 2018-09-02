import assert from 'assert';
import React from 'react';
import ReactDom from 'react-dom';
import { JSDOM } from 'jsdom';
import Game from '../src/components/Game';
import UltimateGame from '../src/components/UltimateGame';

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
  });

  context('standard tic-tac-toe', () => {
    beforeEach(() => {
      // eslint-disable-next-line react/jsx-filename-extension
      ReactDom.render(<Game />, app);
    });

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
    beforeEach(() => {
      // eslint-disable-next-line react/jsx-filename-extension
      ReactDom.render(<UltimateGame />, app);
    });

    it('player can\'t play on already played square', () => {
      const centerMiddleBoard = sel(app, 'centerMiddleBoard');
      clickEmptySquare(sel(centerMiddleBoard, 'centerMiddleSquare')).assertIsFilledWith('X');
      clickSquare(sel(centerMiddleBoard, 'centerMiddleSquare')).assertIsNotFilledWith('O');
      clickSquare(sel(centerMiddleBoard, 'centerMiddleSquare')).assertIsNotFilledWith('');
    });

    getAllBoardTestIds().forEach(({ boardTestId }) => {
      it(`player O has to play in top left board if player X played in top left square of ${boardTestId} board`, () => {
        const boardToPlay = sel(app, boardTestId);
        clickEmptySquare(sel(boardToPlay, 'topLeftSquare')).assertIsFilledWith('X');

        selectAllBoardsExcept(['topLeftBoard'])
          .map(board => clickEmptySquare(sel(board, 'bottomLeftSquare')).assertIsFilledWith(''));
      });
    });

    getAllBoardTestIds().forEach(({ boardTestId }) => {
      it(`player O has to play in center middle board if player X played in center middle square of ${boardTestId} board`, () => {
        const boardToPlay = sel(app, boardTestId);
        clickEmptySquare(sel(boardToPlay, 'centerMiddleSquare')).assertIsFilledWith('X');

        selectAllBoardsExcept(['centerMiddleBoard'])
          .map(board => clickEmptySquare(sel(board, 'topLeftSquare')).assertIsFilledWith(''));

        const centerMiddleBoard = sel(app, 'centerMiddleBoard');
        clickEmptySquare(sel(centerMiddleBoard, 'bottomRightSquare')).assertIsFilledWith('O');
      });
    });

    [
      { squareTestId: 'topLeftSquare', boardOPlayerMustPlay: 'topLeftBoard' },
      { squareTestId: 'topMiddleSquare', boardOPlayerMustPlay: 'topMiddleBoard' },
      { squareTestId: 'topRightSquare', boardOPlayerMustPlay: 'topRightBoard' },
      { squareTestId: 'centerLeftSquare', boardOPlayerMustPlay: 'centerLeftBoard' },
      { squareTestId: 'centerMiddleSquare', boardOPlayerMustPlay: 'centerMiddleBoard' },
      { squareTestId: 'centerRightSquare', boardOPlayerMustPlay: 'centerRightBoard' },
      { squareTestId: 'bottomLeftSquare', boardOPlayerMustPlay: 'bottomLeftBoard' },
      { squareTestId: 'bottomMiddleSquare', boardOPlayerMustPlay: 'bottomMiddleBoard' },
      { squareTestId: 'bottomRightSquare', boardOPlayerMustPlay: 'bottomRightBoard' },
    ].forEach(({ squareTestId, boardOPlayerMustPlay }) => {
      it(`player X has to play in bottom right board if player O played in bottom right square of ${boardOPlayerMustPlay} board
        (first played square ${squareTestId} of centerMiddleBoard)`, () => {
        const boardToPlay = sel(app, 'centerMiddleBoard');
        clickEmptySquare(sel(boardToPlay, squareTestId)).assertIsFilledWith('X');

        selectAllBoardsExcept([boardOPlayerMustPlay])
          .map(board => clickSquare(sel(board, 'bottomRightSquare')).assertIsNotFilledWith('O'));
        clickEmptySquare(sel(sel(app, boardOPlayerMustPlay), 'bottomRightSquare')).assertIsFilledWith('O');

        selectAllBoardsExcept(squareTestId !== 'bottomRightSquare' ? ['bottomRightBoard'] : ['bottomRightBoard', 'centerMiddleBoard'])
          .map(board => clickSquare(sel(board, 'bottomRightSquare')).assertIsNotFilledWith('X'));
        clickEmptySquare(sel(sel(app, 'bottomRightBoard'), 'centerLeftSquare')).assertIsFilledWith('X');
      });
    });

    it('play a game, X wins', () => {
      playGameWhereXWins();
    });

    it('Allow no more play after someone wins', () => {
      playGameWhereXWins();
      clickEmptySquare(sel(sel(app, 'topMiddleBoard'), 'topLeftSquare')).assertIsFilledWith('');
    });

    it('when a local board is won, disable further input on it', () => {
      const topLeftBoard = sel(app, 'topLeftBoard');
      const topMiddleBoard = sel(app, 'topMiddleBoard');
      const topRightBoard = sel(app, 'topRightBoard');
      const centerLeftBoard = sel(app, 'centerLeftBoard');

      // X wins top left board (top horizontal) so that O is sent to that board
      clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertIsFilledWith('X');
      clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertIsFilledWith('O');
      clickEmptySquare(sel(topLeftBoard, 'topRightSquare')).assertIsFilledWith('X');
      clickEmptySquare(sel(topRightBoard, 'topLeftSquare')).assertIsFilledWith('O');
      clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertIsFilledWith('X');

      // O can't play top left board anymore
      clickEmptySquare(sel(topLeftBoard, 'centerLeftSquare')).assertIsFilledWith('');
      clickEmptySquare(sel(topLeftBoard, 'centerMiddleSquare')).assertIsFilledWith('');

      clickEmptySquare(sel(centerLeftBoard, 'topLeftSquare')).assertIsFilledWith('O');

      // X can't play top left board anymore
      clickEmptySquare(sel(topLeftBoard, 'centerLeftSquare')).assertIsFilledWith('');
      clickEmptySquare(sel(topLeftBoard, 'centerMiddleSquare')).assertIsFilledWith('');
    });

    getAllBoardTestIds()
      .filter(({ boardTestId }) => boardTestId !== 'topLeftBoard')
      .forEach(({ boardTestId }) => {
        it(
          `when a board is won and next player is sent to that board, that player can play any board except the won one (played ${boardTestId})`,
          () => {
            const topLeftBoard = sel(app, 'topLeftBoard');
            const topMiddleBoard = sel(app, 'topMiddleBoard');
            const topRightBoard = sel(app, 'topRightBoard');

            // X wins top left board (top horizontal) so that O is sent to that board
            clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertIsFilledWith('X');
            clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertIsFilledWith('O');
            clickEmptySquare(sel(topLeftBoard, 'topRightSquare')).assertIsFilledWith('X');
            clickEmptySquare(sel(topRightBoard, 'topLeftSquare')).assertIsFilledWith('O');
            clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertIsFilledWith('X');

            const anyBoardButTopLeft = sel(app, boardTestId);
            clickEmptySquare(sel(anyBoardButTopLeft, 'centerMiddleSquare')).assertIsFilledWith('O');
          },
        );
      });

    it('when sent to board that was already won, that player can play any other board', () => {
      const topLeftBoard = sel(app, 'topLeftBoard');
      const topMiddleBoard = sel(app, 'topMiddleBoard');
      const topRightBoard = sel(app, 'topRightBoard');
      const centerMiddleBoard = sel(app, 'centerMiddleBoard');
      const centerLeftBoard = sel(app, 'centerLeftBoard');
      const bottomLeftBoard = sel(app, 'bottomLeftBoard');

      // X wins top left board (top horizontal) so that O is sent to that board
      clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertIsFilledWith('X');
      clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertIsFilledWith('O');
      clickEmptySquare(sel(topLeftBoard, 'topRightSquare')).assertIsFilledWith('X');
      clickEmptySquare(sel(topRightBoard, 'topLeftSquare')).assertIsFilledWith('O');
      clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertIsFilledWith('X');
      clickEmptySquare(sel(centerLeftBoard, 'bottomLeftSquare')).assertIsFilledWith('O');
      clickEmptySquare(sel(bottomLeftBoard, 'topLeftSquare')).assertIsFilledWith('X');

      // Top left board was already won, so O can play any other board
      clickEmptySquare(sel(centerMiddleBoard, 'bottomRightSquare')).assertIsFilledWith('O');
    });

    it('simple time travel (X wins, then back three turns, then O wins)');
    it('time travel re-enables previously won local-board');
    it('complex X win (with O winning two boards)');
    it('when game is won, disable further inputs on all local boards');
    it('time travel after game was won reenables relevant local boards');
  });

  function playGameWhereXWins() {
    const topLeftBoard = sel(app, 'topLeftBoard');
    const topMiddleBoard = sel(app, 'topMiddleBoard');
    const topRightBoard = sel(app, 'topRightBoard');
    const centerLeftBoard = sel(app, 'centerLeftBoard');
    const centerMiddleBoard = sel(app, 'centerMiddleBoard');
    const centerRightBoard = sel(app, 'centerRightBoard');
    const bottomLeftBoard = sel(app, 'bottomLeftBoard');
    const bottomMiddleBoard = sel(app, 'bottomMiddleBoard');
    const bottomRightBoard = sel(app, 'bottomRightBoard');

    // X wins top left board (top horizontal)
    clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(topLeftBoard, 'centerLeftSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(centerLeftBoard, 'bottomLeftSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(bottomLeftBoard, 'topLeftSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(topLeftBoard, 'topRightSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(topRightBoard, 'topLeftSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertIsFilledWith('X');

    // X wins center middle board (middle vertical)
    clickEmptySquare(sel(topMiddleBoard, 'centerMiddleSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(centerMiddleBoard, 'topMiddleSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(topMiddleBoard, 'bottomMiddleSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(bottomMiddleBoard, 'bottomMiddleSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(bottomMiddleBoard, 'centerMiddleSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(centerMiddleBoard, 'bottomMiddleSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(bottomMiddleBoard, 'bottomLeftSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(bottomLeftBoard, 'bottomLeftSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(bottomLeftBoard, 'centerMiddleSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(centerMiddleBoard, 'centerMiddleSquare')).assertIsFilledWith('X');

    // X wins bottom right board (reverse diagonal) and the game
    clickEmptySquare(sel(centerRightBoard, 'bottomRightSquare')).assertIsFilledWith('O');
    clickEmptySquare(sel(bottomRightBoard, 'bottomLeftSquare')).assertIsFilledWith('X');
    clickEmptySquare(sel(bottomLeftBoard, 'bottomRightSquare')).assertIsFilledWith('O');
    // bottomLeftBoard is won by O, so X can play any board
    clickEmptySquare(sel(bottomRightBoard, 'topRightSquare')).assertIsFilledWith('X');
    // centerMiddleBoard is won by X, so O can play any board
    assertGameStatus('Next player', 'O');
    clickEmptySquare(sel(topRightBoard, 'bottomRightSquare')).assertIsFilledWith('O');
    assertGameStatus('Next player', 'X');
    clickEmptySquare(sel(bottomRightBoard, 'centerMiddleSquare')).assertIsFilledWith('X');

    assertGameStatus('Winner', 'X');
  }

  function clickEmptySquare(square) {
    assert.equal(square.textContent, '', 'square that should be empty is not');
    click(square);

    return {
      assertIsFilledWith: symbol => assert.equal(
        square.textContent, symbol, `square not filled with expected symbol "${symbol}"`,
      ),
    };
  }

  function clickSquare(square) {
    click(square);

    return {
      assertIsNotFilledWith: symbol => assert.notEqual(
        square.textContent, symbol, `square filled with unexpected symbol "${symbol}"`,
      ),
    };
  }

  function selectAllBoardsExcept(boardTestIds) {
    return getAllBoardTestIds()
      .filter(data => !boardTestIds.includes(data.boardTestId))
      .map(data => sel(app, data.boardTestId));
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

function getAllBoardTestIds() {
  return [
    { boardTestId: 'topLeftBoard' },
    { boardTestId: 'topMiddleBoard' },
    { boardTestId: 'topRightBoard' },
    { boardTestId: 'centerLeftBoard' },
    { boardTestId: 'centerMiddleBoard' },
    { boardTestId: 'centerRightBoard' },
    { boardTestId: 'bottomLeftBoard' },
    { boardTestId: 'bottomMiddleBoard' },
    { boardTestId: 'bottomRightBoard' },
  ];
}
