import assert from 'assert';
import React from 'react';
import ReactDom from 'react-dom';
import {
  getBrowserEnvironment,
  find,
  sel,
  selectByText,
  clickOnElement,
  triggerChange,
  createAlertSpy,
} from '../test-utils';
import SaveAndLoad from '../../src/components/SaveAndLoad';

describe('SaveAndLoad component', () => {
  let document;
  let window;
  let app;
  let originalGlobalWindow;
  let click;
  let gameState;

  beforeEach(() => {
    ({ document, window } = getBrowserEnvironment());
    app = createAppElement();
    window.alert = createAlertSpy();
    originalGlobalWindow = global.window;
    global.window = window;
    click = clickOnElement.bind(null, window);
    ReactDom.render(<SaveAndLoad onLoadGameClick={() => {}} />, app);
    gameState = {};
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

  context('click on "Save" button', () => {
    beforeEach(() => {
      app = createAppElement();
      ReactDom.render(
        <SaveAndLoad gameState={gameState} onLoadGameClick={() => {}} />,
        app,
      );
    });

    it('should hide load game textarea', () => {
      gameState.fruit = ['apples', 'oranges'];
      const exportButton = selectByText(app, 'button', 'Save');
      click(selectByText(app, 'button', 'Load'));

      click(exportButton);

      assertNoImportGameTextarea();
    });

    it('should not display the textarea element if gameState is empty', () => {
      app = createAppElement();
      ReactDom.render(
        <SaveAndLoad gameState="" onLoadGameClick={() => {}} />,
        app,
      );
      const exportButton = selectByText(app, 'button', 'Save');

      click(exportButton);

      assertTextareaIsHidden(app);
    });

    it('should JSON stringify and display the gameState data in the textarea element', () => {
      gameState.fruit = ['apples', 'oranges'];
      const exportButton = selectByText(app, 'button', 'Save');
      assertTextareaIsHidden(app);

      click(exportButton);

      assert.equal(getTextArea(app).value, '{"fruit":["apples","oranges"]}');
    });

    it('should display textarea element if gameState is not empty', () => {
      gameState.fruit = ['apples', 'oranges'];
      const exportButton = selectByText(app, 'button', 'Save');
      assertTextareaIsHidden(app);

      click(exportButton);

      assert.equal(getTextArea(app).style.display, '');
    });

    it('should display "Close" button to user after export button is clicked', () => {
      click(selectByText(app, 'button', 'Save'));
      assert.ok(selectByText(app, 'button', 'Close'));
    });

    it('should hide textarea and "Close" button if "Close" button is clicked', () => {
      click(selectByText(app, 'button', 'Save'));
      click(selectByText(app, 'button', 'Close'));
      assert.strictEqual(
        selectByText(app, 'button', 'Close'),
        null,
        'close should not be displayed',
      );
      assertTextareaIsHidden(app);
    });
  });

  context('click on load button', () => {
    beforeEach(() => {
      app = createAppElement();
      ReactDom.render(
        <SaveAndLoad gameState={gameState} onLoadGameClick={() => {}} />,
        app,
      );
    });

    it('should display a textarea', () => {
      assert.strictEqual(
        typeof getTextArea(app),
        'undefined',
        'textarea should not render before the click',
      );

      click(selectByText(app, 'button', 'Load'));

      const textarea = getTextArea(app);
      assert.ok(textarea, 'textarea not found');
      assert.deepEqual(
        textarea,
        find(app, 'importGameTextarea'),
        'textarea should be for importing another game',
      );
    });

    it('should hide save game textarea', () => {
      gameState.fruit = ['apples', 'oranges'];
      click(selectByText(app, 'button', 'Save'));

      click(selectByText(app, 'button', 'Load'));

      const textarea = getTextArea(app);
      assert.strictEqual(
        find(app, 'exportGameTextarea'),
        null,
        'textarea for exporting the game should not render',
      );
      assert.deepEqual(
        textarea,
        find(app, 'importGameTextarea'),
        'textarea should be for importing another game',
      );
    });

    it('should display "Load game" button when Load button is clicked', () => {
      assert.strictEqual(selectByText(app, 'button', 'Load game'), null);
      click(selectByText(app, 'button', 'Load'));
      assert.ok(
        selectByText(app, 'button', 'Load game'),
        '"Load game" button not found',
      );
    });

    it('should hide textarea, "Load game" and Close button when Close button is clicked', () => {
      click(selectByText(app, 'button', 'Load'));
      click(selectByText(app, 'button', 'Close'));
      assertLoadGameDialogRemoved();
    });

    it('should parse textarea content as JSON and send it to callback function', () => {
      let loadGameClickHandler;
      const promise = new Promise(resolve => {
        loadGameClickHandler = resolve;
      });
      app = createAppElement();
      ReactDom.render(
        <SaveAndLoad
          gameState={gameState}
          onLoadGameClick={loadGameClickHandler}
        />,
        app,
      );
      click(selectByText(app, 'button', 'Load'));

      sel(app, 'importGameTextarea').value =
        '{ "aProperty": "foo", "aList": ["foo", "bar"] }';
      triggerChange(sel(app, 'importGameTextarea'));
      click(selectByText(app, 'button', 'Load game'));

      return promise.then(state =>
        assert.deepEqual(state, { aProperty: 'foo', aList: ['foo', 'bar'] }),
      );
    });

    it('should close load game dialog after game loaded', () => {
      app = createAppElement();
      ReactDom.render(
        <SaveAndLoad gameState={gameState} onLoadGameClick={() => {}} />,
        app,
      );
      click(selectByText(app, 'button', 'Load'));

      sel(app, 'importGameTextarea').value =
        '{ "aProperty": "foo", "aList": ["foo", "bar"] }';
      triggerChange(sel(app, 'importGameTextarea'));
      click(selectByText(app, 'button', 'Load game'));

      assertLoadGameDialogRemoved();
    });

    it('should alert the user when textarea content is not a valid JSON object', () => {
      click(selectByText(app, 'button', 'Load'));

      sel(app, 'importGameTextarea').value = 'notValidJson{}';
      triggerChange(sel(app, 'importGameTextarea'));
      assert.equal(
        window.alert.getMessageLog().length,
        0,
        'No alerts on textarea change event',
      );
      click(selectByText(app, 'button', 'Load game'));

      assert.equal(window.alert.getMessageLog()[0], 'Invalid save game JSON');
    });
  });

  function assertLoadGameDialogRemoved() {
    assertNoImportGameTextarea();
    assert.strictEqual(
      selectByText(app, 'button', 'Load game'),
      null,
      '"Load game" button should not render',
    );
  }

  function assertNoImportGameTextarea() {
    assert.strictEqual(
      find(app, 'importGameTextarea'),
      null,
      'textarea for importing a game should not render',
    );
  }

  function assertTextareaIsHidden(appElement) {
    assert.strictEqual(
      getTextArea(appElement),
      undefined,
      'textarea should not render',
    );
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
