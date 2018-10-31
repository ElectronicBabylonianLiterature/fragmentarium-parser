const fs = require('fs')
const { buildCsv, buildObject } = require('./csvHelpers')
const main = require('../lib/main')

const ids = ['1', '2']
const csvFilename = 'export.csv'
const csv = buildCsv(...ids.map(_id => ({ _id })))
const jsonFileName = 'fragmentarium.json'
const expectedJson = JSON.stringify(ids.map(_id => buildObject({ _id })), null, '\t')

describe('main', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'readFile').mockImplementation((file, charset, cb) => cb(null, csv))
    jest.spyOn(fs, 'writeFile').mockImplementation((file, dict, cb) => cb())
  })

  it('reads the given file', async () => {
    await main(csvFilename)
    expect(fs.readFile).toHaveBeenCalledWith(csvFilename, 'utf8', expect.any(Function))
  })

  it('writes output to fragmentarium.json', async () => {
    await main(csvFilename)
    expect(fs.writeFile).toHaveBeenCalledWith(jsonFileName, expectedJson, expect.any(Function))
  })
})
