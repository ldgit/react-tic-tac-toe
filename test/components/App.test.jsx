import assert from 'assert';
import renderApp from '../../src/components/App';
import { sel } from '../test-utils';

describe('Main App component', () => {
  it('should render (smoke test)', () => {
    renderApp(document);
    assert.ok(sel(document.body, 'topLeftBoard'));
  });
});
