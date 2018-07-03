const Papa = require('papaparse')

module.exports = function parseCsv (csv) {
  return Papa.parse(csv, {header: true}).data.map(rawObject => ({
    ...rawObject,
    joins: rawObject.joins ? rawObject.joins.split(/(?: \+ |)/g) : [] // eslint-disable-line no-control-regex, no-irregular-whitespace
  }))
}
