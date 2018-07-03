const parseCsv = require('../src/parseCsv')

const csvDefaults = {
  _id: '_id',
  cdliNumber: 'cdliNumber',
  bmidNumber: 'bmidNumber',
  accession: 'accession',
  genre: 'genre',
  fincke: 'fincke',
  publicationPlace: 'publicationPlace',
  joins: '',
  subcollection: 'subcollection',
  description: 'description',
  length: 'length',
  width: 'width',
  thickness: 'thickness',
  collection: 'collection',
  script: 'script',
  date: 'date',
  folio: 'folio',
  register: 'register',
  transliteration: 'transliteration',
  notes: 'notes'
}

const objectDefaults = {
  ...csvDefaults,
  joins: []
}

function buildObject (params) {
  return {
    ...objectDefaults,
    ...params
  }
}

function buildCsv (params) {
  const object = {
    ...csvDefaults,
    ...params
  }
  return `_id,cdliNumber,bmidNumber,accession,genre,fincke,publicationPlace,joins,subcollection,description,length,width,thickness,collection,script,date,folio,register,transliteration,notes
"${object._id}","${object.cdliNumber}","${object.bmidNumber}","${object.accession}","${object.genre}","${object.fincke}","${object.publicationPlace}","${object.joins}","${object.subcollection}","${object.description}","${object.length}","${object.width}","${object.thickness}","${object.collection}","${object.script}","${object.date}","${object.folio}","${object.register}","${object.transliteration}","${object.notes}"`
}

describe('parseCsv', () => {
  it('parses all columns', () => {
    const csv = buildCsv({})
    const expected = buildObject({})
    expect(parseCsv(csv)).toEqual([expected])
  })

  it('parses + joins', () => {
    const csv = buildCsv({joins: 'join1 + join2'})
    const expected = buildObject({joins: ['join1', 'join2']})
    expect(parseCsv(csv)).toEqual([expected])
  })

  it('parses  joins', () => {
    const csv = buildCsv({joins: 'join1join2'})
    const expected = buildObject({joins: ['join1', 'join2']})
    expect(parseCsv(csv)).toEqual([expected])
  })
})
