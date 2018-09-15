import assert from 'assert';
import React from 'react';
import ReactDom from 'react-dom';
import { JSDOM } from 'jsdom';
import App from '../../src/components/App';

describe('Main App component', () => {
  let window;
  let document;
  let app;
  let originalGlobalWindow;

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
    originalGlobalWindow = global.window;
    global.window = window;
  });

  afterEach(() => {
    global.window = originalGlobalWindow;
  });

  it('should render (smoke test)', () => {
    ReactDom.render(<App />, app);
    assert.equal(app.querySelectorAll('[data-testid="topLeftBoard"]').length, 1);
  });
});
