import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import deepcopy from 'deepcopy';
import {
  historyToActions,
  actionsToQueryString,
  queryStringToActions,
  actionsToState,
} from '../src/url-query-state';
import { playSquare, toggleSpecialIcons } from '../src/actions';
import { getInitialState } from '../src/ultimate-game';
import historiesJson from './fixtures/histories.json';

deepFreeze(historiesJson);

describe('historyToActions', () => {
  let histories;

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
  it('should return empty array when given empty string', () => {
    expect(queryStringToActions('')).to.eql([]);
    expect(queryStringToActions('   ')).to.eql([]);
    expect(queryStringToActions(undefined)).to.eql([]);
  });

  it('should return empty array when given invalid string', () => {
    expect(queryStringToActions('not=the&correct=querystring')).to.eql([]);
    expect(queryStringToActions('a=p40&a=p04&a=p46')).to.eql([]);
  });

  it('should return actions list when given correct query string', () => {
    expect(queryStringToActions('a[]=p40&a[]=p04&a[]=p46')).to.eql([
      playSquare(4, 0),
      playSquare(0, 4),
      playSquare(4, 6),
    ]);
  });
});

describe('actionsToState', () => {
  it('should return initialState when given no actions', () => {
    expect(actionsToState([])).to.eql(getInitialState());
  });

  it('should return state with all actions applied in order (one action given)', () => {
    const expectedState = getInitialState();
    expectedState.nextPlayer = 'O';
    const newHistoryItem = deepcopy(expectedState.history[0]);
    newHistoryItem.boards = newHistoryItem.boards.map(board => ({ ...board, isActive: false }));
    newHistoryItem.boards[4].squares[7] = 'X';
    newHistoryItem.boards[7].isActive = true;
    expectedState.history.push(newHistoryItem);
    expectedState.pointInHistory = 1;
    expectedState.specialIcons = true;

    expect(actionsToState([playSquare(4, 7), toggleSpecialIcons()])).to.eql(expectedState);
  });
});

describe('integration of all four', () => {
  it('should work full circle', () => {
    const actions = historyToActions(historiesJson.fullGameHistory);
    const queryString = actionsToQueryString(actions);
    const actionsAgain = queryStringToActions(queryString);
    const newHistory = actionsToState(actionsAgain).history;

    expect(newHistory).to.eql(historiesJson.fullGameHistory);
  });
});
