import assert from 'assert';
import React from 'react';
import ReactDom from 'react-dom';
import App from '../../src/components/App';
import { getBrowserEnvironment, sel } from '../test-utils';

describe('Main App component', () => {
  let window;
  let document;
  let app;
  let originalGlobalWindow;

  beforeEach(() => {
    ({ window, document } = getBrowserEnvironment());
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
    assert.ok(sel(app, 'topLeftBoard'));
  });
});
