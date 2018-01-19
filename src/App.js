import templates from './App.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import ImportCSV from './components/importCSV/ImportCSV';

import './app.scss';

/**
 * App class
 */
class App extends Component {}

Soy.register(App, templates);

export {App};
export default App;
