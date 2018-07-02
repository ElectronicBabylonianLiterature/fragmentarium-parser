const Papa = require('papaparse')

module.exports = function parseCsv (csv) {
  return Papa.parse(csv, {header: true}).data
}
