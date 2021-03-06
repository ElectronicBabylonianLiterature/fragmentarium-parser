const fs = require('fs')
const parseCsv = require('./parseCsv')
const cleanNewLines = require('./cleanNewLines')

function saveJson (json) {
  return new Promise((resolve, reject) =>
    fs.writeFile('fragmentarium.json', json, err => err ? reject(err) : resolve())
  )
}

module.exports = async function main (csvFileName) {
  return new Promise((resolve, reject) =>
    fs.readFile(csvFileName, 'utf8', (err, data) =>
      err
        ? reject(err)
        : parseCsv(data)
          .then(fragmentarium => fragmentarium.map(cleanNewLines))
          .then(fragementarium => JSON.stringify(fragementarium, null, '\t'))
          .then(saveJson)
          .then(resolve)
    )
  )
}
