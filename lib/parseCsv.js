const Papa = require('papaparse')

const poundSeparator = ' ₤ '

function parseJoins (joins) {
  const joinsSeparator = /(?: \+ |\u000b)/g // eslint-disable-line no-control-regex
  return joins ? joins.split(joinsSeparator) : []
}

function parseFolios (folios) {
  return folios
    ? folios.split(poundSeparator).map(entry => {
      const match = /^(?:(?<name>.*) )(?<number>[^ ]+)$/.exec(entry)
      return {
        name: match.groups.name || '',
        number: match.groups.number
      }
    })
    : []
}

function parseScript (script) {
  return script || 'NA'
}

function parseDate (dateString) {
  const dateSeparator = '.'
  const [day, month, year] = dateString.split(dateSeparator)
  return new Date(Date.UTC(year, month - 1, day))
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

function parseMeasure (measure) {
  const match = /^(?<value>\d+,?\d*)(?<note>.*)$/.exec(measure)
  return match
    ? {
      value: Number(match.groups.value.replace(',', '.')),
      note: match.groups.note.trim()
    }
    : {}
}

module.exports = async function parseCsv (csv) {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      complete: ({ data }) => {
        resolve(data.map(rawObject => ({
          ...rawObject,
          joins: parseJoins(rawObject.joins),
          folios: parseFolios(rawObject.folios),
          record: parseRecord(rawObject.record),
          script: parseScript(rawObject.script),
          length: parseMeasure(rawObject.length),
          width: parseMeasure(rawObject.width),
          thickness: parseMeasure(rawObject.thickness)
        })))
      }
    })
  })
}
