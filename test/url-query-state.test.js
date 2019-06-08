import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import deepcopy from 'deepcopy';
import { historyToActions, actionsToQueryString } from '../src/url-query-state';
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

  it('full game test', () => {
    expect(historyToActions(histories.fullGameHistory)).to.eql([
      playSquare(4, 0),
      playSquare(0, 4),
      playSquare(4, 6),
      playSquare(6, 0),
      playSquare(0, 3),
      playSquare(3, 0),
      playSquare(0, 6),
      playSquare(6, 2),
      playSquare(2, 0),
      playSquare(0, 8),
      playSquare(8, 0),
      playSquare(0, 1),
      playSquare(1, 0),
      playSquare(0, 2),
      playSquare(2, 5),
      playSquare(5, 0),
      playSquare(0, 5),
      playSquare(5, 4),
      playSquare(4, 3),
      playSquare(3, 4), // Board 4 is won, can play anywhere else
      playSquare(0, 7),
      playSquare(7, 0),
      playSquare(0, 0), // Board 0 is won, can play anywhere else
      playSquare(5, 8),
      playSquare(8, 4),
      playSquare(3, 8),
      playSquare(8, 8), // X wins
    ]);
  });

  function createEmptyBoardHistoryItem() {
    return deepcopy(historiesJson.twoItemHistory[0]);
  }
});

describe('actionsToQueryString', () => {
  it('should return empty string when given no actions', () => {
    expect(actionsToQueryString([])).to.equal('');
  });

  it('should return correct string when given one action: p marks action type, first digit is board index, second is quare index', () => {
    expect(actionsToQueryString([playSquare(1, 4)])).to.equal('a[]=p14');
    expect(actionsToQueryString([playSquare(0, 8)])).to.equal('a[]=p08');
    expect(actionsToQueryString([playSquare(8, 5)])).to.equal('a[]=p85');
  });

  it('should correctly convert multiple actions', () => {
    expect(actionsToQueryString([playSquare(4, 0), playSquare(0, 4), playSquare(4, 6)])).to.equal(
      'a[]=p40&a[]=p04&a[]=p46',
    );
  });
});

describe('queryStringToActions', () => {
  it.skip('should return empty array when given empty string', () => {});
  it.skip('should return empty array when given invalid string', () => {});
});

describe('actionsToHistory', () => {
  it.skip('should return history with one empty board when given no actions', () => {});
  it.skip('should return history with empty board and a board with action applied when given one action', () => {});
});
