import templates from './App.soy.js';
import Component from 'metal-component';
import {Config} from 'metal-state';
import Soy from 'metal-soy';

import './app.scss';

class App extends Component {
}

Soy.register(App, templates);

export { App };
export default App;
