import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { getBrowserEnvironment } from './test-utils';
import { whenPolyfillsLoadedUnconfigured } from '../src/load-polyfills';

describe('load-polyfills', () => {
  let onloadCallbacks;
  let document;
  let window;
  let whenPolyfillsLoaded;

  beforeEach(() => {
    const html = fs.readFileSync(path.join('.', 'test', 'fixtures', 'load-polyfills.html'));
    ({ document, window } = getBrowserEnvironment(html));
    setUpEnvironmentThatDoesNotNeedPolyfills(document, window);
    onloadCallbacks = [];
    Object.defineProperty(window.HTMLScriptElement.prototype, 'onload', {
      set(value) {
        onloadCallbacks.push(value);
      },
      configurable: true,
    });
    whenPolyfillsLoaded = whenPolyfillsLoadedUnconfigured.bind(null, window, document);
  });

  it('should not load polyfills if all needed features supported', () => {
    whenPolyfillsLoaded(() => {});

    const polyfillScripts = document.getElementsByTagName('script');
    assert.strictEqual(polyfillScripts.length, 0);
  });

  it('should call provided callback if no polyfills needed', done => {
    whenPolyfillsLoaded(done);
  });

  it('should load polyfill scripts if Map not supported', () => {
    assert.equal(typeof window.Map, 'function');
    delete window.Map;

    whenPolyfillsLoaded(() => {});

    assertPolyfillsLoaded();
  });

  it('should load polyfill scripts if Object.assign not supported', () => {
    assert.equal(typeof window.Object.assign, 'function');
    delete window.Object.assign;

    whenPolyfillsLoaded(() => {});

    assertPolyfillsLoaded();
  });

  it('should load polyfill scripts if Array.prototype.fill not supported', () => {
    assert.equal(typeof window.Array.prototype.fill, 'function');
    delete window.Array.prototype.fill;

    whenPolyfillsLoaded(() => {});

    assertPolyfillsLoaded();
  });

  it('should load polyfill scripts if requestAnimationFrame not supported', () => {
    assert.equal(typeof window.requestAnimationFrame, 'function');
    delete window.requestAnimationFrame;

    whenPolyfillsLoaded(() => {});

    assertPolyfillsLoaded();
  });

  function assertPolyfillsLoaded() {
    const polyfillScripts = document.getElementsByTagName('script');
    assert.strictEqual(polyfillScripts.length, 2);
  }

  describe('if polyfills needed', () => {
    beforeEach(() => {
      delete window.Map;
    });

    it('should create script tags for each data-polyfillurl element with corresponding src attribute', () => {
      whenPolyfillsLoaded(() => {});

      const polyfillScripts = document.getElementsByTagName('script');
      assert.strictEqual(polyfillScripts.length, 2);
      assert.strictEqual(polyfillScripts[0].src, 'polyfills.js');
      assert.strictEqual(polyfillScripts[1].src, 'more-polyfills.js');
    });

    it('should execute given callback function when all polyfills loaded', () => {
      const promise = new Promise(resolve => {
        whenPolyfillsLoaded(resolve);
      });

      onloadCallbacks.forEach(callback => callback());

      return promise;
    });

    it('should not execute given callback function if only some polyfills loaded', () => {
      const wait = seconds => new Promise(resolve => setTimeout(resolve, seconds));

      whenPolyfillsLoaded(() => assert.fail('Should not run if only one polyfill script loaded'));
      onloadCallbacks[1]();

      return wait(30);
    });
  });
});

function setUpEnvironmentThatDoesNotNeedPolyfills(document, window) {
  /* eslint-disable no-param-reassign */
  window.Map = Map;
  window.requestAnimationFrame = () => {};
  window.Array = {
    prototype: { fill: () => {} },
  };
  // window.Array.prototype.fill = () => {};
  window.Object = { assign: Object.assign };
}
