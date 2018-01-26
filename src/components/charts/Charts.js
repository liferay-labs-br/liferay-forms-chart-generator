import Component from 'metal-component';
import {d3} from 'metal-charts';
import {Config} from 'metal-state';

import Soy from 'metal-soy';
import templates from './Charts.soy.js';

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
