export function whenPolyfillsLoadedUnconfigured(window, document, callback) {
  if (window.Map && window.Object.assign && window.Array.prototype.fill && window.requestAnimationFrame) {
    callback();
    return;
  }

  const polyfillUrlElements = document.querySelectorAll('[data-polyfillurl]');
  let scriptsLoaded = 0;
  function whenAllScriptsLoad() {
    scriptsLoaded += 1;
    if (scriptsLoaded === polyfillUrlElements.length) {
      callback();
    }
  }

  /**
   * NodeList.forEach is not available in Internet Explorer.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
   */
  for (let i = 0; i < polyfillUrlElements.length; i += 1) {
    const script = document.createElement('script');
    script.src = polyfillUrlElements[i].getAttribute('data-polyfillurl');
    script.onload = whenAllScriptsLoad;
    document.body.appendChild(script);
  }
}

export const whenPolyfillsLoaded = callback => whenPolyfillsLoadedUnconfigured(window, document, callback);
