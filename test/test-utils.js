import assert from 'assert';
import { JSDOM } from 'jsdom';

export function getBrowserEnvironment() {
  const { window } = new JSDOM(`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Tic-Tac-Toe</title>
    </head>
    <body></body>
  </html>`);
  const { document } = window;

  return { document, window };
}

export function sel(container, testId) {
  const element = container.querySelector(`[data-testid="${testId}"]`);
  assert.ok(element, `element with data-testid "${testId}" not found`);

  return element;
}

export function clickOnElement(window, element) {
  const event = new window.MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  assert.ok(element, 'Element that should be clicked on does not exist');
  element.dispatchEvent(event);
}

export function selectByText(container, selector, text) {
  const elements = Array.from(container.querySelectorAll(selector)).filter(element => element.textContent === text);

  return elements.length > 0 ? elements[0] : null;
}
