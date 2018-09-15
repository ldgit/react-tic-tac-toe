import assert from 'assert';
import React from 'react';
import ReactDom from 'react-dom';
import { getBrowserEnvironment, selectByText, clickOnElement } from '../test-utils';
import SaveAndLoad from '../../src/components/SaveAndLoad';

describe('SaveAndLoad component', () => {
  let document;
  let window;
  let app;
  let originalGlobalWindow;
  let click;

  beforeEach(() => {
    ({ document, window } = getBrowserEnvironment());
    app = createAppElement();
    originalGlobalWindow = global.window;
    global.window = window;
    click = clickOnElement.bind(null, window);
    ReactDom.render(<SaveAndLoad />, app);
  });

  afterEach(() => {
    global.window = originalGlobalWindow;
  });

  it('textarea with exported state is hidden initially', () => {
    assertTextareaIsHidden(app);
  });

  it('should not render a "Close" button before textarea is displayed', () => {
    assert.strictEqual(selectByText(app, 'button', 'Close'), null);
  });

  context('click on "Export" button', () => {
    let gameState;
    beforeEach(() => {
      gameState = {};
      app = createAppElement();
      ReactDom.render(<SaveAndLoad gameState={gameState} />, app);
    });

    it('should not display the textarea element if gameState is empty', () => {
      app = createAppElement();
      ReactDom.render(<SaveAndLoad gameState="" />, app);
      const exportButton = selectByText(app, 'button', 'Export');

      click(exportButton);

      assertTextareaIsHidden(app);
    });

    it('should JSON stringify and display the gameState data in the textarea element', () => {
      gameState.fruit = ['apples', 'oranges'];
      const exportButton = selectByText(app, 'button', 'Export');
      assertTextareaIsHidden(app);

      click(exportButton);

      assert.equal(getTextArea(app).value, '{"fruit":["apples","oranges"]}');
    });

    it('should display textarea element if gameState is not empty', () => {
      gameState.fruit = ['apples', 'oranges'];
      const exportButton = selectByText(app, 'button', 'Export');
      assertTextareaIsHidden(app);

      click(exportButton);

      assert.equal(getTextArea(app).style.display, '');
    });

    it('should display "Close" button to user after export button is clicked', () => {
      click(selectByText(app, 'button', 'Export'));
      assert.ok(selectByText(app, 'button', 'Close'));
    });

    it('should hide textarea and "Close" button if "Close" button is clicked', () => {
      click(selectByText(app, 'button', 'Export'));
      click(selectByText(app, 'button', 'Close'));
      assert.strictEqual(selectByText(app, 'button', 'Close'), null, 'close should not be displayed');
      assertTextareaIsHidden(app);
    });
  });

  function assertTextareaIsHidden(appElement) {
    assert.strictEqual(getTextArea(appElement), undefined, 'textarea should not render');
  }

  function createAppElement() {
    const appElement = document.createElement('div');
    document.body.appendChild(appElement);

    return appElement;
  }
});

function getTextArea(app) {
  return app.getElementsByTagName('textarea')[0];
}
