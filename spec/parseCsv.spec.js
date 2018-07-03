const parseCsv = require('../lib/parseCsv')

const csvDefaults = {
  _id: '_id',
  cdliNumber: 'cdliNumber',
  bmIdNumber: 'bmIdNumber',
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
  folio: '',
  register: '',
  transliteration: 'transliteration',
  notes: 'notes'
}

const objectDefaults = {
  ...csvDefaults,
  joins: [],
  folio: [],
  register: []
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
  return `_id,cdliNumber,bmIdNumber,accession,genre,fincke,publicationPlace,joins,subcollection,description,length,width,thickness,collection,script,date,folio,register,transliteration,notes
"${object._id}","${object.cdliNumber}","${object.bmIdNumber}","${object.accession}","${object.genre}","${object.fincke}","${object.publicationPlace}","${object.joins}","${object.subcollection}","${object.description}","${object.length}","${object.width}","${object.thickness}","${object.collection}","${object.script}","${object.date}","${object.folio}","${object.register}","${object.transliteration}","${object.notes}"`
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

  it('parses  joins', () => {
    expectCsv({joins: 'join1join2'}).toParseTo({joins: ['join1', 'join2']})
  })

  it('parses ₤ folio', () => {
    expectCsv({folio: 'folio1 ₤ folio2'}).toParseTo({folio: ['folio1', 'folio2']})
  })

  it('parses register', () => {
    expectCsv({register: 'user1€01.07.2018€type1 ₤ user2€31.07.2018€type2'})
      .toParseTo({register: [
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
})
