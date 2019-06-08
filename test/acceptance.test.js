import assert from 'assert';
import { expect } from 'chai';
import React from 'react';
import ReactDom from 'react-dom';
import fs from 'fs';
import path from 'path';
import UltimateGame from '../src/components/UltimateGame';
import {
  sel,
  clickOnElement,
  selectByText,
  triggerChange,
  assertFilledWith,
  assertNotFilledWith,
} from './test-utils';

const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds));

describe('Ultimate Tic-tac-toe game', () => {
  let app;
  let click;

  beforeEach(() => {
    app = document.createElement('div');
    document.body.appendChild(app);
    click = clickOnElement.bind(null, window);
    // eslint-disable-next-line react/jsx-filename-extension
    ReactDom.render(<UltimateGame />, app);
  });

  it("player can't play on already played square", () => {
    const centerMiddleBoard = sel(app, 'centerMiddleBoard');
    clickEmptySquare(sel(centerMiddleBoard, 'centerMiddleSquare')).assertFilledWith('X');
    clickSquare(sel(centerMiddleBoard, 'centerMiddleSquare')).assertFilledWith('X');
    clickSquare(sel(centerMiddleBoard, 'centerMiddleSquare')).assertFilledWith('X');
  });

  getAllBoardTestIds().forEach(({ boardTestId }) => {
    it(`player O has to play in top left board if player X played in top left square of ${boardTestId} board`, () => {
      const boardToPlay = sel(app, boardTestId);
      clickEmptySquare(sel(boardToPlay, 'topLeftSquare')).assertFilledWith('X');

      selectAllBoardsExcept(['topLeftBoard']).map(board =>
        clickEmptySquare(sel(board, 'bottomLeftSquare')).assertFilledWith(''),
      );
    });
  });

  getAllBoardTestIds().forEach(({ boardTestId }) => {
    it(`player O has to play in center middle board if player X played in center middle square of ${boardTestId} board`, () => {
      const boardToPlay = sel(app, boardTestId);
      clickEmptySquare(sel(boardToPlay, 'centerMiddleSquare')).assertFilledWith('X');

      selectAllBoardsExcept(['centerMiddleBoard']).map(board =>
        clickEmptySquare(sel(board, 'topLeftSquare')).assertFilledWith(''),
      );

      const centerMiddleBoard = sel(app, 'centerMiddleBoard');
      clickEmptySquare(sel(centerMiddleBoard, 'bottomRightSquare')).assertFilledWith('O');
    });
  });

  [
    { squareTestId: 'topLeftSquare', boardOPlayerMustPlay: 'topLeftBoard' },
    {
      squareTestId: 'topMiddleSquare',
      boardOPlayerMustPlay: 'topMiddleBoard',
    },
    { squareTestId: 'topRightSquare', boardOPlayerMustPlay: 'topRightBoard' },
    {
      squareTestId: 'centerLeftSquare',
      boardOPlayerMustPlay: 'centerLeftBoard',
    },
    {
      squareTestId: 'centerMiddleSquare',
      boardOPlayerMustPlay: 'centerMiddleBoard',
    },
    {
      squareTestId: 'centerRightSquare',
      boardOPlayerMustPlay: 'centerRightBoard',
    },
    {
      squareTestId: 'bottomLeftSquare',
      boardOPlayerMustPlay: 'bottomLeftBoard',
    },
    {
      squareTestId: 'bottomMiddleSquare',
      boardOPlayerMustPlay: 'bottomMiddleBoard',
    },
    {
      squareTestId: 'bottomRightSquare',
      boardOPlayerMustPlay: 'bottomRightBoard',
    },
  ].forEach(({ squareTestId, boardOPlayerMustPlay }) => {
    it(`player X has to play in bottom right board if player O played in bottom right square of ${boardOPlayerMustPlay} board
        (first played square ${squareTestId} of centerMiddleBoard)`, () => {
      const boardToPlay = sel(app, 'centerMiddleBoard');
      clickEmptySquare(sel(boardToPlay, squareTestId)).assertFilledWith('X');

      selectAllBoardsExcept([boardOPlayerMustPlay]).map(board =>
        clickSquare(sel(board, 'bottomRightSquare')).assertNotFilledWith('O'),
      );
      clickEmptySquare(sel(sel(app, boardOPlayerMustPlay), 'bottomRightSquare')).assertFilledWith(
        'O',
      );

      selectAllBoardsExcept(
        squareTestId !== 'bottomRightSquare'
          ? ['bottomRightBoard']
          : ['bottomRightBoard', 'centerMiddleBoard'],
      ).map(board => clickSquare(sel(board, 'bottomRightSquare')).assertNotFilledWith('X'));
      clickEmptySquare(sel(sel(app, 'bottomRightBoard'), 'centerLeftSquare')).assertFilledWith('X');
    });
  });

  it('play a game, X wins', () => {
    playGameWherePlayerOneWins({});
  });

  it('Allow no more play after someone wins', () => {
    playGameWherePlayerOneWins({});
    clickEmptySquare(sel(sel(app, 'topMiddleBoard'), 'topLeftSquare')).assertFilledWith('');
  });

  it('when a local board is won, disable further input on it', () => {
    const topLeftBoard = sel(app, 'topLeftBoard');
    const topMiddleBoard = sel(app, 'topMiddleBoard');
    const topRightBoard = sel(app, 'topRightBoard');
    const centerLeftBoard = sel(app, 'centerLeftBoard');

    // X wins top left board (top horizontal) so that O is sent to that board
    clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertFilledWith('X');
    clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertFilledWith('O');
    clickEmptySquare(sel(topLeftBoard, 'topRightSquare')).assertFilledWith('X');
    clickEmptySquare(sel(topRightBoard, 'topLeftSquare')).assertFilledWith('O');
    clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertFilledWith('X');

    // O can't play top left board anymore
    clickEmptySquare(sel(topLeftBoard, 'centerLeftSquare')).assertFilledWith('');
    clickEmptySquare(sel(topLeftBoard, 'centerMiddleSquare')).assertFilledWith('');

    clickEmptySquare(sel(centerLeftBoard, 'topLeftSquare')).assertFilledWith('O');

    // X can't play top left board anymore
    clickEmptySquare(sel(topLeftBoard, 'centerLeftSquare')).assertFilledWith('');
    clickEmptySquare(sel(topLeftBoard, 'centerMiddleSquare')).assertFilledWith('');
  });

  getAllBoardTestIds()
    .filter(({ boardTestId }) => boardTestId !== 'topLeftBoard')
    .forEach(({ boardTestId }) => {
      it(`when a board is won and next player is sent to that board, that player can play any board except the won one (played ${boardTestId})`, () => {
        const topLeftBoard = sel(app, 'topLeftBoard');
        const topMiddleBoard = sel(app, 'topMiddleBoard');
        const topRightBoard = sel(app, 'topRightBoard');

        // X wins top left board (top horizontal) so that O is sent to that board
        clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertFilledWith('X');
        clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertFilledWith('O');
        clickEmptySquare(sel(topLeftBoard, 'topRightSquare')).assertFilledWith('X');
        clickEmptySquare(sel(topRightBoard, 'topLeftSquare')).assertFilledWith('O');
        clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertFilledWith('X');

        const anyBoardButTopLeft = sel(app, boardTestId);
        clickEmptySquare(sel(anyBoardButTopLeft, 'centerMiddleSquare')).assertFilledWith('O');
      });
    });

  it('when sent to board that was already won, that player can play any other board', () => {
    const topLeftBoard = sel(app, 'topLeftBoard');
    const topMiddleBoard = sel(app, 'topMiddleBoard');
    const topRightBoard = sel(app, 'topRightBoard');
    const centerMiddleBoard = sel(app, 'centerMiddleBoard');
    const centerLeftBoard = sel(app, 'centerLeftBoard');
    const bottomLeftBoard = sel(app, 'bottomLeftBoard');

    // X wins top left board (top horizontal) so that O is sent to that board
    clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertFilledWith('X');
    clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertFilledWith('O');
    clickEmptySquare(sel(topLeftBoard, 'topRightSquare')).assertFilledWith('X');
    clickEmptySquare(sel(topRightBoard, 'topLeftSquare')).assertFilledWith('O');
    clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertFilledWith('X');
    clickEmptySquare(sel(centerLeftBoard, 'bottomLeftSquare')).assertFilledWith('O');
    clickEmptySquare(sel(bottomLeftBoard, 'topLeftSquare')).assertFilledWith('X');

    // Top left board was already won, so O can play any other board
    clickEmptySquare(sel(centerMiddleBoard, 'bottomRightSquare')).assertFilledWith('O');
  });

  it('should color all non-playable boards light red, all won boards o-won-board or x-won-board class, and playable boards white', () => {
    const allBoards = getAllBoardTestIds().map(data => sel(app, data.boardTestId));
    allBoards.forEach(assertBoardIsWhite);

    const centerMiddleBoard = sel(app, 'centerMiddleBoard');
    const topMiddleBoard = sel(app, 'topMiddleBoard');
    const bottomMiddleBoard = sel(app, 'bottomMiddleBoard');
    clickEmptySquare(sel(centerMiddleBoard, 'topMiddleSquare')).assertFilledWith('X');

    selectAllBoardsExcept(['topMiddleBoard']).forEach(assertBoardIsRed);
    assertBoardIsWhite(topMiddleBoard);

    clickEmptySquare(sel(topMiddleBoard, 'centerMiddleSquare')).assertFilledWith('O');
    clickEmptySquare(sel(centerMiddleBoard, 'bottomMiddleSquare')).assertFilledWith('X');
    clickEmptySquare(sel(bottomMiddleBoard, 'centerMiddleSquare')).assertFilledWith('O');
    clickEmptySquare(sel(centerMiddleBoard, 'centerMiddleSquare')).assertFilledWith('X');

    selectAllBoardsExcept(['centerMiddleBoard']).forEach(assertBoardIsWhite);
    assertBoardHasWonClass(centerMiddleBoard);
  });

  it('simple time travel: play one move, then go to game start, then play a different move', () => {
    const topLeftBoard = sel(app, 'topLeftBoard');
    clickEmptySquare(sel(topLeftBoard, 'bottomRightSquare'));
    click(selectByText(app, 'button', 'Go to game start'));
    clickEmptySquare(sel(topLeftBoard, 'bottomRightSquare')).assertFilledWith('X');
  });

  it('time travel: X wins, then back three turns, then continue playing', () => {
    const bottomLeftBoard = sel(app, 'bottomLeftBoard');
    const bottomRightBoard = sel(app, 'bottomRightBoard');
    const topRightBoard = sel(app, 'topRightBoard');
    const centerMiddleBoard = sel(app, 'centerMiddleBoard');
    const centerLeftBoard = sel(app, 'centerLeftBoard');

    XWinsIn23Moves();
    assertGameStatus('Winner', 'X');
    click(selectByText(app, 'button', 'Go to move 20')); // O has just won bottomLeftBoard by clicking on bottomRightSquare

    assert.strictEqual(
      sel(bottomLeftBoard, 'bottomRightSquare').textContent,
      'O',
      'Square filled in 20. move must still be filled',
    );
    assert.strictEqual(
      sel(bottomRightBoard, 'centerMiddleSquare').textContent,
      '',
      'Square filled in 23. move must not be filled',
    );
    assert.strictEqual(
      sel(topRightBoard, 'bottomRightSquare').textContent,
      '',
      'Square filled in 22. move must not be filled',
    );
    assert.strictEqual(
      sel(bottomRightBoard, 'topRightSquare').textContent,
      '',
      'Square filled in 21. move must not be filled',
    );

    assertGameStatus('Next player', 'X');

    clickEmptySquare(sel(bottomRightBoard, 'centerMiddleSquare')).assertFilledWith('X');
    // Center middle board already won by X, so O can play any active board
    assertGameStatus('Next player', 'O');
    clickEmptySquare(sel(centerMiddleBoard, 'bottomRightSquare')).assertFilledWith('');
    assertGameStatus(
      'Next player',
      'O',
      'Next player is still "O" because center middle board is won',
    );
    clickEmptySquare(sel(centerLeftBoard, 'bottomRightSquare')).assertFilledWith('O');
  });

  it('time travel: X wins in 23. moves, go to game start, Y wins in 24 moves', () => {
    playGameWhereXWins();
    click(selectByText(app, 'button', 'Go to game start'));
    playGameWhereOWins();
  });

  it('time travel: all time travel buttons must be preserved after they are clicked until next move is played', () => {
    playGameWhereXWins();
    click(selectByText(app, 'button', 'Go to game start'));
    click(selectByText(app, 'button', 'Go to move 20'));
    click(selectByText(app, 'button', 'Go to move 18'));
    click(selectByText(app, 'button', 'Go to game start'));
    clickEmptySquare(sel(sel(app, 'centerMiddleBoard'), 'centerMiddleSquare')).assertFilledWith(
      'X',
    );
    assert.strictEqual(
      selectByText(app, 'button', 'Go to move 20'),
      null,
      'Button "Go to move 20" should not render',
    );
    assert.strictEqual(
      selectByText(app, 'button', 'Go to move 2'),
      null,
      'Button "Go to move 2" should not render',
    );
  });

  it('time travel: highlight time travel button for current move', () => {
    const topMiddleBoard = sel(app, 'topMiddleBoard');
    expect(selectByText(app, 'button', 'Go to game start').className).to.have.string(
      'current-move-button',
    );
    clickEmptySquare(sel(topMiddleBoard, 'topMiddleSquare')).assertFilledWith('X');
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

  it('when game is won, disable further inputs on all local boards', () => {
    playGameWherePlayerOneWins({});
    const topMiddleBoard = sel(app, 'topMiddleBoard');
    clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertFilledWith('');
    assertGameStatus('Winner', 'X');
  });

  it('time travel re-enables previously won local-board', () => {
    const topLeftBoard = sel(app, 'topLeftBoard');
    const topMiddleBoard = sel(app, 'topMiddleBoard');
    const topRightBoard = sel(app, 'topRightBoard');

    // X wins top left board (top horizontal) so that O is sent to that board
    clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertFilledWith('X');
    clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertFilledWith('O');
    clickEmptySquare(sel(topLeftBoard, 'topRightSquare')).assertFilledWith('X');
    clickEmptySquare(sel(topRightBoard, 'topLeftSquare')).assertFilledWith('O');
    clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertFilledWith('X');

    click(selectByText(app, 'button', 'Go to move 4'));
    clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertFilledWith('X');

    click(selectByText(app, 'button', 'Go to game start'));
    clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertFilledWith('X');
  });

  it('clicking on "Vue vs. React?" button toggles special mode on and off', () => {
    const specialModeToggle = selectByText(app, 'button', 'Vue vs. React?');
    const topMiddleBoardCenterMiddleSquare = sel(sel(app, 'topMiddleBoard'), 'centerMiddleSquare');
    const topMiddleBoardBottomMiddleSquare = sel(
      sel(app, 'centerMiddleBoard'),
      'bottomMiddleSquare',
    );
    const unoccupiedSquare = sel(sel(app, 'bottomMiddleBoard'), 'centerMiddleSquare');
    clickEmptySquare(topMiddleBoardCenterMiddleSquare).assertFilledWith('X');

    click(specialModeToggle);
    assertCorrectIconInGameStatus('react-icon');
    click(specialModeToggle);

    clickEmptySquare(topMiddleBoardBottomMiddleSquare).assertFilledWith('O');
    assertSpecialModeNotToggled(
      topMiddleBoardCenterMiddleSquare,
      topMiddleBoardBottomMiddleSquare,
      unoccupiedSquare,
    );

    click(specialModeToggle);
    assertSpecialModeToggled(
      topMiddleBoardCenterMiddleSquare,
      topMiddleBoardBottomMiddleSquare,
      unoccupiedSquare,
    );

    click(specialModeToggle);
    assertSpecialModeNotToggled(
      topMiddleBoardCenterMiddleSquare,
      topMiddleBoardBottomMiddleSquare,
      unoccupiedSquare,
    );
  });

  context('save and load functionality', () => {
    it('can export current game state', () => {
      const topLeftBoard = sel(app, 'topLeftBoard');
      const topMiddleBoard = sel(app, 'topMiddleBoard');
      const topRightBoard = sel(app, 'topRightBoard');
      clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertFilledWith('X');
      clickEmptySquare(sel(topMiddleBoard, 'topRightSquare')).assertFilledWith('O');
      clickEmptySquare(sel(topRightBoard, 'topMiddleSquare')).assertFilledWith('X');

      click(selectByText(app, 'button', 'Save'));

      const exportedState = JSON.parse(sel(app, 'exportGameTextarea').value);
      assert.equal(
        exportedState.history[3].boards[2].squares[1],
        'X',
        'incorrect topRightBoard topMiddleSquare value',
      );
      assert.equal(
        exportedState.history[2].boards[1].squares[2],
        'O',
        'incorrect topMiddleBoard topRightSquare value',
      );
      assert.equal(
        exportedState.history[3].boards[0].squares[1],
        'X',
        'incorrect topRightBoard topMiddleSquare value',
      );
    });

    it('can load a game state', () => {
      const topLeftBoard = sel(app, 'topLeftBoard');
      const topMiddleBoard = sel(app, 'topMiddleBoard');
      const topRightBoard = sel(app, 'topRightBoard');
      click(selectByText(app, 'button', 'Load'));
      sel(app, 'importGameTextarea').value = fs.readFileSync(
        path.join('test', 'exportedGame.json'),
      );
      triggerChange(sel(app, 'importGameTextarea'));

      click(selectByText(app, 'button', 'Load game'));

      assertFilledWith(sel(topLeftBoard, 'topMiddleSquare'), 'X');
      assertFilledWith(sel(topMiddleBoard, 'topRightSquare'), 'O');
      assertFilledWith(sel(topRightBoard, 'topMiddleSquare'), 'X');

      clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertFilledWith('O');
      clickEmptySquare(sel(topLeftBoard, 'bottomLeftSquare')).assertFilledWith('X');
    });
  });

  describe('share url functionality', () => {
    it('should setup a game from query string actions if provided', () => {
      testUtils.changeWindowUrl('https://example.com/?remove=this');
      const topLeftBoard = sel(app, 'topLeftBoard');
      const topMiddleBoard = sel(app, 'topMiddleBoard');
      const bottomRightBoard = sel(app, 'bottomRightBoard');
      // Play some moves
      clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertFilledWith('X');
      clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertFilledWith('O');
      clickEmptySquare(sel(topLeftBoard, 'bottomRightSquare')).assertFilledWith('X');
      clickEmptySquare(sel(bottomRightBoard, 'centerMiddleSquare')).assertFilledWith('O');

      const shareButton = selectByText(app, '*', 'Share game');
      expect(shareButton, 'shareButton not found').to.not.be.null;
      click(shareButton);

      expect(sel(app, 'urlShareInput').value).to.equal(
        'https://example.com/?a[]=p01&a[]=p10&a[]=p08&a[]=p84',
      );
    });

    it('should set all game actions as url query string when shareButton clicked', () => {
      testUtils.changeWindowUrl('https://example.com/?a[]=p01&a[]=p10&a[]=p08&a[]=p84');
      ReactDom.unmountComponentAtNode(app);
      ReactDom.render(<UltimateGame />, app);
      const topLeftBoard = sel(app, 'topLeftBoard');
      const topMiddleBoard = sel(app, 'topMiddleBoard');
      const bottomRightBoard = sel(app, 'bottomRightBoard');

      return wait(0).then(() => {
        assertFilledWith(sel(topLeftBoard, 'topMiddleSquare'), 'X');
        assertFilledWith(sel(topMiddleBoard, 'topLeftSquare'), 'O');
        assertFilledWith(sel(topLeftBoard, 'bottomRightSquare'), 'X');
        assertFilledWith(sel(bottomRightBoard, 'centerMiddleSquare'), 'O');
      });
    });
  });

  function assertSpecialModeNotToggled(
    topMiddleBoardCenterMiddleSquare,
    topMiddleBoardBottomMiddleSquare,
    unoccupiedSquare,
  ) {
    expect(topMiddleBoardCenterMiddleSquare.className).to.not.have.string(
      'square-vue-icon',
      'No icons shows up until user clicks "Vue vs. React?" button',
    );
    expect(topMiddleBoardCenterMiddleSquare.className).to.not.have.string(
      'square-react-icon',
      'No icons shows up until user clicks "Vue vs. React?" button',
    );
    expect(topMiddleBoardBottomMiddleSquare.className).to.not.have.string('square-vue-icon');
    expect(topMiddleBoardBottomMiddleSquare.className).to.not.have.string('square-react-icon');
    expect(unoccupiedSquare.className).to.not.have.string('square-vue-icon');
    expect(unoccupiedSquare.className).to.not.have.string('square-react-icon');
    assertCorrectIconInGameStatus('x-icon');
  }

  function assertSpecialModeToggled(
    topMiddleBoardCenterMiddleSquare,
    topMiddleBoardBottomMiddleSquare,
    unoccupiedSquare,
  ) {
    expect(topMiddleBoardCenterMiddleSquare.className).to.have.string(
      'square-vue-icon',
      'X player has Vue icon',
    );
    expect(topMiddleBoardBottomMiddleSquare.className).to.have.string(
      'square-react-icon',
      'O player has React icon',
    );
    expect(unoccupiedSquare.className).to.not.have.string('square-vue-icon');
    expect(unoccupiedSquare.className).to.not.have.string('square-react-icon');
    assertCorrectIconInGameStatus('vue-icon');
  }

  function assertCorrectIconInGameStatus(iconToExpect) {
    ['x-icon', 'o-icon', 'vue-icon', 'react-icon']
      .filter(icon => iconToExpect !== icon)
      .forEach(icon => {
        assert.equal(
          sel(app, 'gameStatus').querySelectorAll(`button.${icon}`).length,
          0,
          `Expected to find no button elements with ${icon} class`,
        );
      });
    assert.equal(
      sel(app, 'gameStatus').querySelectorAll(`button.${iconToExpect}`).length,
      1,
      `Expected to find one button element with ${iconToExpect} class`,
    );
  }

  function XWinsIn23Moves() {
    playGameWherePlayerOneWins({});
  }

  function playGameWhereXWins() {
    playGameWherePlayerOneWins({ playerOne: 'X', playerTwo: 'O' });
  }

  function playGameWhereOWins() {
    const topMiddleBoard = sel(app, 'topMiddleBoard');
    clickEmptySquare(sel(topMiddleBoard, 'topLeftSquare')).assertFilledWith('X');

    playGameWherePlayerOneWins({ playerOne: 'O', playerTwo: 'X' });
  }

  function playGameWherePlayerOneWins({ playerOne = 'X', playerTwo = 'O' }) {
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
    clickEmptySquare(sel(topLeftBoard, 'topLeftSquare')).assertFilledWith(playerOne);
    clickEmptySquare(sel(topLeftBoard, 'centerLeftSquare')).assertFilledWith(playerTwo);
    clickEmptySquare(sel(centerLeftBoard, 'bottomLeftSquare')).assertFilledWith(playerOne);
    clickEmptySquare(sel(bottomLeftBoard, 'topLeftSquare')).assertFilledWith(playerTwo);
    clickEmptySquare(sel(topLeftBoard, 'topRightSquare')).assertFilledWith(playerOne);
    clickEmptySquare(sel(topRightBoard, 'topLeftSquare')).assertFilledWith(playerTwo);
    clickEmptySquare(sel(topLeftBoard, 'topMiddleSquare')).assertFilledWith(playerOne);

    // X wins center middle board (middle vertical)
    clickEmptySquare(sel(topMiddleBoard, 'centerMiddleSquare')).assertFilledWith(playerTwo);
    clickEmptySquare(sel(centerMiddleBoard, 'topMiddleSquare')).assertFilledWith(playerOne);
    clickEmptySquare(sel(topMiddleBoard, 'bottomMiddleSquare')).assertFilledWith(playerTwo);
    clickEmptySquare(sel(bottomMiddleBoard, 'bottomMiddleSquare')).assertFilledWith(playerOne);
    clickEmptySquare(sel(bottomMiddleBoard, 'centerMiddleSquare')).assertFilledWith(playerTwo);
    clickEmptySquare(sel(centerMiddleBoard, 'bottomMiddleSquare')).assertFilledWith(playerOne);
    clickEmptySquare(sel(bottomMiddleBoard, 'bottomLeftSquare')).assertFilledWith(playerTwo);
    clickEmptySquare(sel(bottomLeftBoard, 'bottomLeftSquare')).assertFilledWith(playerOne);
    clickEmptySquare(sel(bottomLeftBoard, 'centerMiddleSquare')).assertFilledWith(playerTwo);
    clickEmptySquare(sel(centerMiddleBoard, 'centerMiddleSquare')).assertFilledWith(playerOne);

    // X wins bottom right board (reverse diagonal) and the game
    clickEmptySquare(sel(centerRightBoard, 'bottomRightSquare')).assertFilledWith(playerTwo);
    clickEmptySquare(sel(bottomRightBoard, 'bottomLeftSquare')).assertFilledWith(playerOne);
    clickEmptySquare(sel(bottomLeftBoard, 'bottomRightSquare')).assertFilledWith(playerTwo); // 20. move
    // bottomLeftBoard is won by O, so X can play any board
    clickEmptySquare(sel(bottomRightBoard, 'topRightSquare')).assertFilledWith(playerOne);
    // centerMiddleBoard is won by X, so O can play any board
    assertGameStatus('Next player', playerTwo);
    clickEmptySquare(sel(topRightBoard, 'bottomRightSquare')).assertFilledWith(playerTwo);
    assertGameStatus('Next player', playerOne);
    clickEmptySquare(sel(bottomRightBoard, 'centerMiddleSquare')).assertFilledWith(playerOne);

    assertGameStatus('Winner', playerOne);
  }

  function clickEmptySquare(square) {
    assert.equal(square.textContent, '', 'square that should be empty is not');
    click(square);

    return {
      assertFilledWith: symbol => assertFilledWith(square, symbol),
    };
  }

  function clickSquare(square) {
    click(square);

    return {
      assertNotFilledWith: symbol => assertNotFilledWith(square, symbol),
      assertFilledWith: symbol => assertFilledWith(square, symbol),
    };
  }

  function selectAllBoardsExcept(boardTestIds) {
    return getAllBoardTestIds()
      .filter(data => !boardTestIds.includes(data.boardTestId))
      .map(data => sel(app, data.boardTestId));
  }

  function assertGameStatus(statusType, player) {
    expect(sel(app, 'gameStatus').textContent).to.have.string(statusType);
    expect(sel(app, 'gameStatus').querySelector('button').textContent).to.equal(player);
  }

  function assertBoardIsWhite(board) {
    assert.strictEqual(
      board.classList.contains('disabled-board'),
      false,
      `${board.dataset.testid} board should be white, not marked as disabled`,
    );
    assert.strictEqual(
      board.classList.contains('x-won-board'),
      false,
      `${board.dataset.testid} board should be white, not x-won`,
    );
    assert.strictEqual(
      board.classList.contains('o-won-board'),
      false,
      `${board.dataset.testid} board should be white, not o-won`,
    );
  }

  function assertBoardIsRed(board) {
    assert.strictEqual(
      board.classList.contains('disabled-board'),
      true,
      `${board.dataset.testid} must contain disabled-board class`,
    );
    assert.strictEqual(
      board.classList.contains('x-won-board'),
      false,
      `${board.dataset.testid}board should not be x-won`,
    );
    assert.strictEqual(
      board.classList.contains('o-won-board'),
      false,
      `${board.dataset.testid}board should not be o-won`,
    );
  }

  function assertBoardHasWonClass(board) {
    assert.strictEqual(
      board.classList.contains('o-won-board') || board.classList.contains('x-won-board'),
      true,
      `${board.dataset.testid} must contain x-won-board or o-won-board class`,
    );
    assert.strictEqual(
      board.classList.contains('disabled-board'),
      false,
      `${board.dataset.testid} board should not be marked as disabled`,
    );
  }
});

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
