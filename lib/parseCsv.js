const Papa = require('papaparse')

const poundSeparator = ' ₤ '

function parseJoins (joins) {
  const joinsSeparator = /(?: \+ |\u000b)/g
  return joins ? joins.split(joinsSeparator) : []
}

function parseFolio (folio) {
  return folio ? folio.split(poundSeparator) : []
}

function parseScript (script) {
  return script || 'NA'
}

function parseDate (dateString) {
  const dateSeparator = '.'
  const [day, month, year] = dateString.split(dateSeparator)
  return `${year}-${month}-${day}`
}

function parseRegister (register) {
  const registerPropertySeparator = '€'
  return (register ? register.split(poundSeparator) : [])
    .map(entry => entry.split(registerPropertySeparator))
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
          joins: parseJoins(rawObject.joins),
          folio: parseFolio(rawObject.folio),
          register: parseRegister(rawObject.register),
          script: parseScript(rawObject.script),
          museum: 'The British Museum'
        })))
      }
    })
  })
}
