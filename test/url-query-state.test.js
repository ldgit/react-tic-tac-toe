import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import deepcopy from 'deepcopy';
import { historyToActions } from '../src/url-query-state';
import { playSquare } from '../src/actions';
import historiesJson from './fixtures/histories.json';

describe('historyToActions', () => {
  let histories;

  before(() => deepFreeze(historiesJson));

  beforeEach(() => {
    histories = deepcopy(historiesJson);
  });

  it('given empty history, return empty array', () => {
    expect(historyToActions([])).to.eql([]);
  });

  it('given history with one item, return empty array', () => {
    expect(historyToActions(histories.oneItemHistory)).to.eql([]);
  });

  it('given history with two items, return action needed to transition from first to second history item', () => {
    expect(historyToActions(histories.twoItemHistory)).to.eql([playSquare(0, 0)]);

    histories.twoItemHistory[1] = createEmptyBoardHistoryItem();
    histories.twoItemHistory[1].boards[6].squares[8] = 'X';
    expect(historyToActions(histories.twoItemHistory)).to.eql([playSquare(6, 8)]);

    histories.twoItemHistory[1] = createEmptyBoardHistoryItem();
    histories.twoItemHistory[1].boards[1].squares[4] = 'X';
    expect(historyToActions(histories.twoItemHistory)).to.eql([playSquare(1, 4)]);
  });

  it('given history with three items, return actions needed to transition from first to last history item', () => {
    expect(historyToActions(histories.threeItemHistory)).to.eql([
      playSquare(0, 0),
      playSquare(0, 1),
    ]);

    histories.threeItemHistory[1] = createEmptyBoardHistoryItem();
    histories.threeItemHistory[1].boards[1].squares[4] = 'X';
    histories.threeItemHistory[2] = deepcopy(histories.threeItemHistory[1]);
    histories.threeItemHistory[2].boards[4].squares[8] = 'O';
    expect(historyToActions(histories.threeItemHistory)).to.eql([
      playSquare(1, 4),
      playSquare(4, 8),
    ]);
  });

  function createEmptyBoardHistoryItem() {
    return deepcopy(historiesJson.twoItemHistory[0]);
  }
});

describe('actionsToQueryString', () => {
  it.skip('should return empty string when given no actions', () => {});
});

describe('queryStringToActions', () => {
  it.skip('should return empty array when given empty string', () => {});
  it.skip('should return empty array when given invalid string', () => {});
});

describe('actionsToHistory', () => {
  it.skip('should return history with one empty board when given no actions', () => {});
  it.skip('should return history with empty board and a board with action applied when given one action', () => {});
});
