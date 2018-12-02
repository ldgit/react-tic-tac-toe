import renderApp from './components/App';
import { whenPolyfillsLoaded } from './load-polyfills';
import './index.sass';

whenPolyfillsLoaded(() => renderApp(document));
