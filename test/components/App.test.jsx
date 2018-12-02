import assert from 'assert';
import renderApp from '../../src/components/App';
import { getBrowserEnvironment, sel } from '../test-utils';

describe('Main App component', () => {
  let window;
  let document;
  let originalGlobalWindow;

  beforeEach(() => {
    ({ window, document } = getBrowserEnvironment());
    originalGlobalWindow = global.window;
    global.window = window;
  });

  afterEach(() => {
    global.window = originalGlobalWindow;
  });

  it('should render (smoke test)', () => {
    renderApp(document);
    assert.ok(sel(document.body, 'topLeftBoard'));
  });
});
