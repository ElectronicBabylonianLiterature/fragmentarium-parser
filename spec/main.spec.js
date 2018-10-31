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
    spyOn(fs, 'readFile').and.callFake((file, charset, cb) => cb(null, csv))
    spyOn(fs, 'writeFile').and.callFake((file, dict, cb) => cb())
  })

  it('reads the given file', async () => {
    await main(csvFilename).catch(fail)
    expect(fs.readFile).toHaveBeenCalledWith(csvFilename, 'utf8', jasmine.any(Function))
  })

  it('writes output to fragmentarium.json', async () => {
    await main(csvFilename).catch(fail)
    expect(fs.writeFile).toHaveBeenCalledWith(jsonFileName, expectedJson, jasmine.any(Function))
  })
})
