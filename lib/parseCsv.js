const Papa = require('papaparse')
const _ = require('lodash')

function parseDate (dateString) {
  const [day, month, year] = dateString.split('.')
  return `${year}-${month}-${day}`
}

function parseRegister (register) {
  return (register ? register.split(' ₤ ') : [])
    .map(entry => entry.split('€'))
    .map(([user, date, type]) => ({
      user,
      date: parseDate(date),
      type
    }))
}

module.exports = async function parseCsv (csv) {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      complete: ({data}) => {
        resolve(data.map(rawObject => ({
          ...rawObject,
          joins: rawObject.joins ? rawObject.joins.split(/(?: \+ |\u000b)/g) : [],
          folio: rawObject.folio ? rawObject.folio.split(' ₤ ') : [],
          register: parseRegister(rawObject.register),
          script: _.isEmpty(rawObject.script) ? 'NA' : rawObject.script
        })))
      }
    })
  })
}
