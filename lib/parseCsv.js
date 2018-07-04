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

function parseRecord (record) {
  const recordPropertySeparator = '€'
  return (record ? record.split(poundSeparator) : [])
    .map(entry => entry.split(recordPropertySeparator))
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
          record: parseRecord(rawObject.record),
          script: parseScript(rawObject.script),
          museum: 'The British Museum'
        })))
      }
    })
  })
}
