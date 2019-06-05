import { getBrowserEnvironment } from './test-utils';

let document;
let window;
let originalGlobalWindow;
let originalGlobalDocument;

beforeEach(() => {
  ({ window, document } = getBrowserEnvironment());
  originalGlobalWindow = global.window;
  originalGlobalDocument = global.document;
  global.window = window;
  global.document = document;
});

afterEach(() => {
  global.document = originalGlobalDocument;
  global.window = originalGlobalWindow;
});
