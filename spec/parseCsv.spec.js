const parseCsv = require('../lib/parseCsv')

const csvDefaults = {
  _id: '_id',
  cdliNumber: 'cdliNumber',
  bmIdNumber: 'bmIdNumber',
  accession: 'accession',
  genre: 'genre',
  fincke: 'fincke',
  publication: 'publication',
  joins: '',
  subcollection: 'subcollection',
  description: 'description',
  length: 'length',
  width: 'width',
  thickness: 'thickness',
  collection: 'collection',
  script: 'script',
  date: 'date',
  folio: '',
  record: '',
  transliteration: 'transliteration',
  notes: 'notes'
}

const objectDefaults = {
  ...csvDefaults,
  joins: [],
  folio: [],
  record: [],
  museum: 'The British Museum'
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
  return `_id,cdliNumber,bmIdNumber,accession,genre,fincke,publication,joins,subcollection,description,length,width,thickness,collection,script,date,folio,record,transliteration,notes
"${object._id}","${object.cdliNumber}","${object.bmIdNumber}","${object.accession}","${object.genre}","${object.fincke}","${object.publication}","${object.joins}","${object.subcollection}","${object.description}","${object.length}","${object.width}","${object.thickness}","${object.collection}","${object.script}","${object.date}","${object.folio}","${object.record}","${object.transliteration}","${object.notes}"`
}

function expectCsv (csvParams) {
  return {
    async toParseTo (objectParams) {
      const csv = buildCsv(csvParams)
      const expected = buildObject(objectParams)
      expect(await parseCsv(csv)).toEqual([expected])
    }
  }
}

describe('parseCsv', () => {
  it('parses all columns', () => {
    expectCsv({}).toParseTo({})
  })

  it('parses + joins', () => {
    expectCsv({joins: 'join1 + join2'}).toParseTo({joins: ['join1', 'join2']})
  })

  it('parses \\u000b joins', () => {
    expectCsv({joins: 'join1\u000bjoin2'}).toParseTo({joins: ['join1', 'join2']})
  })

  it('parses ₤ folio', () => {
    expectCsv({folio: 'folio1 ₤ folio2'}).toParseTo({folio: ['folio1', 'folio2']})
  })

  it('parses record', () => {
    expectCsv({record: 'user1€01.07.2018€type1 ₤ user2€31.07.2018€type2'})
      .toParseTo({record: [
        {
          user: 'user1',
          date: '2018-07-01',
          type: 'type1'
        },
        {
          user: 'user2',
          date: '2018-07-31',
          type: 'type2'
        }
      ]})
  })

  it('parses empty script to NA', () => {
    expectCsv({script: ''}).toParseTo({script: 'NA'})
  })
})
