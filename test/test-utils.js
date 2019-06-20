import assert from 'assert';
import { expect } from 'chai';
import { Simulate } from 'react-dom/test-utils';

export function sel(container, testId) {
  const element = find(container, testId);
  assert.ok(element, `element with data-testid "${testId}" not found`);

  return element;
}

export function find(container, testId) {
  return container.querySelector(`[data-testid="${testId}"]`);
}

export function clickOnElement(window, element) {
  dispatchMouseEvent('mousedown', window, element);
  dispatchMouseEvent('mouseup', window, element);
  dispatchMouseEvent('click', window, element);
}

function dispatchMouseEvent(type, window, element) {
  const event = new window.MouseEvent(type, {
    view: window,
    bubbles: true,
    cancelable: true,
    which: 1, // Which button was pressed? First by default.
  });

  assert.ok(element, 'Element that should be clicked on does not exist');
  element.dispatchEvent(event);
}

export function triggerChange(element) {
  assert.ok(
    element,
    'Element that the change event should be triggered on does not exist',
  );
  Simulate.change(element);
}

export function selectByText(container, selector, text) {
  const elements = Array.from(container.querySelectorAll(selector)).filter(
    element => element.textContent === text,
  );

  return elements.length > 0 ? elements[0] : null;
}

export function createAlertSpy() {
  const messageLog = [];
  const alertSpy = message => messageLog.push(message);
  alertSpy.getMessageLog = () => messageLog;

  return alertSpy;
}

export function assertFilledWith(square, symbol) {
  expect(square.textContent).to.equal(
    symbol,
    `square not filled with expected symbol "${symbol}"`,
  );
}

export function assertNotFilledWith(square, symbol) {
  expect(square.textContent).to.not.equal(
    symbol,
    `square filled with unexpected symbol "${symbol}"`,
  );
}

export function clickEmptySquare(square) {
  assert.equal(square.textContent, '', 'square that should be empty is not');
  clickOnElement(window, square);

  return {
    assertFilledWith: symbol => assertFilledWith(square, symbol),
  };
}
