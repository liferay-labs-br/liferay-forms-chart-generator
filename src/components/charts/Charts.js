import templates from './Charts.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import {Config} from 'metal-state';

import 'metal-charts';

/**
 * App class
 */
class Charts extends Component {}

Charts.STATE = {
  csvData: Config.object(),
};

Soy.register(Charts, templates);

export {Charts};
export default Charts;
