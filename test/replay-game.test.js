import React from 'react';
import ReactDom from 'react-dom';
import { act } from 'react-dom/test-utils';
import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import UltimateGame from '../src/components/UltimateGame';
import {
  sel,
  clickOnElement,
  selectByText,
  triggerChange,
  assertFilledWith,
  clickEmptySquare,
} from './test-utils';

describe('Ultimate Tic-tac-toe game', () => {
  let app;
  let click;

  beforeEach(() => {
    app = document.createElement('div');
    document.body.appendChild(app);
    click = clickOnElement.bind(null, window);
    act(() => {
      // eslint-disable-next-line react/jsx-filename-extension
      ReactDom.render(<UltimateGame />, app);
    });
    jest.useFakeTimers();
  });

  it('clicking on replay button changes it\'s text to "Replay in progress" until replay ends', () => {
    loadGame(path.join('test', 'fixtures', 'replay-test-game.json'));

    clickStartReplayButton();

    assertReplayInProgressInsteadOfReplayButton();

    // Boards emptied
    act(() => jest.advanceTimersByTime(1001));
    assertReplayInProgressInsteadOfReplayButton();

    // First move played
    act(() => jest.advanceTimersByTime(1001));
    assertReplayInProgressInsteadOfReplayButton();

    // Second move played
    act(() => jest.advanceTimersByTime(1001));
    assertReplayInProgressInsteadOfReplayButton();

    // Third move played
    act(() => jest.advanceTimersByTime(1001));
    assertReplayInProgressInsteadOfReplayButton();

    // Fourth move played
    act(() => jest.advanceTimersByTime(1001));
    // Replay done
    expect(selectByText(app, '*', 'Replay game')).to.not.be.null;
    expect(selectByText(app, '*', 'Replay in progress')).to.be.null;
  });

  it('replays game played so far, one move every second', () => {
    loadGame(path.join('test', 'fixtures', 'replay-test-game.json'));
    const topLeftBoard = sel(app, 'topLeftBoard');
    const centerMiddleBoard = sel(app, 'centerMiddleBoard');
    const bottomMiddleBoard = sel(app, 'bottomMiddleBoard');

    // Loaded state
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), 'X');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), 'O');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), 'X');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), 'O');

    clickStartReplayButton();
    act(() => jest.advanceTimersByTime(1001));

    // Boards emptied
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), '');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), '');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), '');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), '');

    act(() => jest.advanceTimersByTime(1001));

    // First move played
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), 'X');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), '');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), '');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), '');

    act(() => jest.advanceTimersByTime(1001));

    // Second move played
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), 'X');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), 'O');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), '');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), '');

    act(() => jest.advanceTimersByTime(1001));

    // Third move played
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), 'X');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), 'O');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), 'X');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), '');

    act(() => jest.advanceTimersByTime(1001));

    // Fourth move played
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), 'X');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), 'O');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), 'X');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), 'O');
  });

  it('players can continue playing after replay finished', () => {
    loadGame(path.join('test', 'fixtures', 'replay-test-game.json'));
    const topLeftBoard = sel(app, 'topLeftBoard');
    const centerMiddleBoard = sel(app, 'centerMiddleBoard');
    const bottomMiddleBoard = sel(app, 'bottomMiddleBoard');
    const centerRightBoard = sel(app, 'centerRightBoard');

    // Loaded state
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), 'X');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), 'O');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), 'X');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), 'O');

    clickStartReplayButton();
    // Boards emptied
    act(() => jest.advanceTimersByTime(1001));
    // First move played
    act(() => jest.advanceTimersByTime(1001));
    // Second move played
    act(() => jest.advanceTimersByTime(1001));
    // Third move played
    act(() => jest.advanceTimersByTime(1001));
    // Fourth move played
    act(() => jest.advanceTimersByTime(1001));

    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), 'X');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), 'O');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), 'X');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), 'O');

    clickEmptySquare(sel(centerRightBoard, 'centerMiddleSquare')).assertFilledWith('X');
    act(() => jest.advanceTimersByTime(1001));
    assertFilledWith(
      sel(centerRightBoard, 'centerMiddleSquare'),
      'X',
      'Move played after replay finished should not be overwritten',
    );
  });

  it('players can continue playing after replay finished (one move played)', () => {
    const topLeftBoard = sel(app, 'topLeftBoard');
    const centerMiddleBoard = sel(app, 'centerMiddleBoard');
    clickEmptySquare(sel(topLeftBoard, 'centerMiddleSquare')).assertFilledWith('X');

    clickStartReplayButton();

    act(() => jest.advanceTimersByTime(1001));
    assertFilledWith(sel(topLeftBoard, 'centerMiddleSquare'), '', 'Board should be emptied first');
    act(() => jest.advanceTimersByTime(1001));

    // We continue playing after replay finished
    clickEmptySquare(sel(centerMiddleBoard, 'centerMiddleSquare'));
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), 'O');

    act(() => jest.advanceTimersByTime(1001));
    assertFilledWith(
      sel(centerMiddleBoard, 'centerMiddleSquare'),
      'O',
      'Move played after replay finished should not be overwritten',
    );
  });

  it('replay once, then replay again', () => {
    loadGame(path.join('test', 'fixtures', 'replay-test-game.json'));
    const topLeftBoard = sel(app, 'topLeftBoard');
    const centerMiddleBoard = sel(app, 'centerMiddleBoard');
    const bottomMiddleBoard = sel(app, 'bottomMiddleBoard');

    clickStartReplayButton();
    act(() => jest.advanceTimersByTime(1001));
    act(() => jest.advanceTimersByTime(1001));
    act(() => jest.advanceTimersByTime(1001));
    act(() => jest.advanceTimersByTime(1001));
    act(() => jest.advanceTimersByTime(1001));

    // Replay finished
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), 'X');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), 'O');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), 'X');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), 'O');

    clickStartReplayButton();
    act(() => jest.advanceTimersByTime(1001));
    // Start replay from the beggining
    assertFilledWith(sel(centerMiddleBoard, 'centerMiddleSquare'), '');
    assertFilledWith(sel(centerMiddleBoard, 'topLeftSquare'), '');
    assertFilledWith(sel(topLeftBoard, 'bottomMiddleSquare'), '');
    assertFilledWith(sel(bottomMiddleBoard, 'centerRightSquare'), '');
  });

  it('should preserve currently toggled player icons', () => {
    loadGame(path.join('test', 'fixtures', 'replay-test-game.json'));
    act(() => click(selectByText(app, '*', 'Vue vs. React')));

    clickStartReplayButton();

    expect(selectByText(app, '*', 'X vs. O')).to.not.be.null;
    expect(selectByText(app, '*', 'Vue vs. React')).to.be.null;

    // Boards emptied
    act(() => jest.advanceTimersByTime(1001));
    expect(selectByText(app, '*', 'X vs. O')).to.not.be.null;
    expect(selectByText(app, '*', 'Vue vs. React')).to.be.null;

    // First move played
    act(() => jest.advanceTimersByTime(1001));
    // Second move played
    act(() => jest.advanceTimersByTime(1001));
    // Third move played
    act(() => jest.advanceTimersByTime(1001));
    // Fourth move played
    act(() => jest.advanceTimersByTime(1001));

    expect(selectByText(app, '*', 'X vs. O')).to.not.be.null;
    expect(selectByText(app, '*', 'Vue vs. React')).to.be.null;
  });

  function clickStartReplayButton() {
    act(() => click(selectByText(app, '*', 'Replay game')));
  }

  function assertReplayInProgressInsteadOfReplayButton() {
    expect(selectByText(app, '*', 'Replay game')).to.be.null;
    expect(selectByText(app, '*', 'Replay in progress')).to.not.be.null;
  }

  function loadGame(gamePath) {
    click(selectByText(app, 'button', 'Load'));
    sel(app, 'importGameTextarea').value = fs.readFileSync(gamePath);
    triggerChange(sel(app, 'importGameTextarea'));
    click(selectByText(app, 'button', 'Load game'));
  }
});
