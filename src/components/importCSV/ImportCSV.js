import templates from './ImportCSV.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

import csv from 'csvtojson';

import './ImportCSV.scss';

/**
 * App class
 */
class ImportCSV extends Component {
  /**
   * Formate CSV
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
      })
      .on('done', () => {
        console.log(this.csvData);
      });
  }

  /**
   * Formate Chart Properties
   * @param {*} csvRow
   */
  formatChartProperties(csvRow) {
    this.removedHeadersIndex = [];
    this.csvData = csvRow
      .filter((value, index) => {
        if (!value.trim()) this.removedHeadersIndex.push(index);

        return value.trim();
      })
      .reduce((initialValue, cur) => {
        initialValue[cur] = [];
        return initialValue;
      }, {});
  }

  /**
   * Format Chart Values
   * @param {*} csvRow
   */
  formatChartValues(csvRow) {
    const rowValues = csvRow.filter(
      (value, index) => this.removedHeadersIndex.indexOf(index) == -1
    );

    Object.keys(this.csvData).forEach((key, index) => {
      this.csvData[key].push(rowValues[index]);
    });
  }

  /**
   * Upload File
   * @param {*} event
   */
  _handleUploadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = this.formatCSV.bind(this);

    reader.readAsText(file);
  }
}

Soy.register(ImportCSV, templates);

export {ImportCSV};
export default ImportCSV;
