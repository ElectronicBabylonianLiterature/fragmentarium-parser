const parseCsv = require('../src/parseCsv')

function buildObject (params) {
  const defaults = {
    _id: '_id',
    cdliNumber: 'cdliNumber',
    bmidNumber: 'bmidNumber',
    accession: 'accession',
    genre: 'genre',
    fincke: 'fincke',
    publicationPlace: 'publicationPlace',
    joins: 'joins',
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
  return {
    ...defaults,
    ...params
  }
}

function buildLine (object) {
  return `"${object._id}","${object.cdliNumber}","${object.bmidNumber}","${object.accession}","${object.genre}","${object.fincke}","${object.publicationPlace}","${object.joins}","${object.subcollection}","${object.description}","${object.length}",${object.width}","${object.thickness}","${object.collection}","${object.script}","${object.date}","${object.folio}","${object.register}","${object.transliteration}","${object.notes}"`
}

describe('parseCsv', () => {
  it('parses all columns', () => {
    const expected = buildObject()
    const csv = `_id,cdliNumber,bmidNumber,accession,genre,fincke,publicationPlace,joins,subcollection,description,length,width,thickness,collection,script,date,folio,register,transliteration,notes
${buildLine(expected)}`
    expect(parseCsv(csv)).toEqual([expected])
  })
})
