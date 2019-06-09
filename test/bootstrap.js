import { getBrowserEnvironment } from './test-utils';

let document;
let window;
let changeWindowUrl;
let originalGlobalWindow;
let originalGlobalDocument;

beforeEach(() => {
  ({ window, document, changeWindowUrl } = getBrowserEnvironment());
  originalGlobalWindow = global.window;
  originalGlobalDocument = global.document;
  global.testUtils = { changeWindowUrl };
  global.window = window;
  global.document = document;
});

afterEach(() => {
  global.document = originalGlobalDocument;
  global.window = originalGlobalWindow;
});
