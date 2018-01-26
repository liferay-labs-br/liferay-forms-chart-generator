import Component from 'metal-component';
import _ from 'lodash';
import Soy from 'metal-soy';
import csv from 'csvtojson';
import {Config} from 'metal-state';

import './ImportCSV.scss';

import templates from './ImportCSV.soy.js';
import '../Charts/Charts';

/**
 * App class
 */
class ImportCSV extends Component {
  /**
   * Format CSV
   * @param {*} event
   */
  formatCSV(event) {
    const csvStr = event.target.result;

    csv({noheader: true})
      .fromString(csvStr)
      .on('csv', (csvRow, index) => {
        if (index) {
          this.formatChartValues(csvRow);
        } else {
          this.formatChartProperties(csvRow);
        }
      });
  }

  /**
   * Format Chart Properties
   * @param {*} csvRow
   */
  formatChartProperties(csvRow) {
    this.removedHeadersIndex = [];
    this.csvData = csvRow
      .filter((value, index) => {
        if (!value.trim()) this.removedHeadersIndex.push(index);

        return value.trim();
      })
      .map((headerValue, index) => {
        return {
          label: headerValue,
          value: [],
        };
      });
  }

  /**
   * Format Chart Values
   * @param {*} csvRow
   */
  formatChartValues(csvRow) {
    const rowValues = csvRow.filter(
      (value, index) => this.removedHeadersIndex.indexOf(index) == -1
    );

    this.csvData.forEach((currentItem, index) => {
      let data = {
          data: [1],
          id: Date.now().toString() + currentItem.value.length.toString(),
          name: rowValues[index],
        },
        filteredItem = _.find(currentItem.value, {name: rowValues[index]});

      if (filteredItem) {
        filteredItem.data[0] += 1;
      } else {
        currentItem.value.push(data);
      }
    });
  }

  /**
   * Upload File
   * @param {*} event
   */
  _handleUploadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (!file || !this.checkFileType(file)) {
      this.errorMessage = 'Por favor selecione um arquivo csv';
      return;
    }

    this.errorMessage = '';
    reader.onload = this.formatCSV.bind(this);
    reader.readAsText(file);
  }

  /**
   * Check file type
   * @param {*} Object
   * @return {boolean}
   */
  checkFileType({type}) {
    return type == 'text/csv';
  }
}

ImportCSV.STATE = {
  csvData: Config.array(),
  errorMessage: Config.string(),
};

Soy.register(ImportCSV, templates);

export {ImportCSV};
export default ImportCSV;
