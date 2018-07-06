const parseCsv = require('../lib/parseCsv')
const {buildCsv, buildObject} = require('./csvHelpers')

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

  it('length', () => {
    expectCsv({length: '0,7 (notes)'}).toParseTo({length: {value: 0.7, note: '(notes)'}})
  })

  it('width', () => {
    expectCsv({width: '1,3'}).toParseTo({width: {value: 1.3, note: ''}})
  })

  it('width', () => {
    expectCsv({width: '13,0 (notes)'}).toParseTo({width: {value: 13.0, note: '(notes)'}})
  })

  it('parses + joins', () => {
    expectCsv({joins: 'join1 + join2 + join3'}).toParseTo({joins: ['join1', 'join2', 'join3']})
  })

  it('parses \\u000b joins', () => {
    expectCsv({joins: 'join1\u000bjoin2\u000bjoin3'}).toParseTo({joins: ['join1', 'join2', 'join3']})
  })

  it('parses ₤ folio', () => {
    expectCsv({folio: 'folio1 ₤ folio2'}).toParseTo({folio: ['folio1', 'folio2']})
  })

  it('parses record', () => {
    expectCsv({record: 'user1€01.07.2018€type1 ₤ user2€31.07.2018€type2'})
      .toParseTo({record: [
        {
          user: 'user1',
          date: new Date('2018-07-01 00:00:00Z'),
          type: 'type1'
        },
        {
          user: 'user2',
          date: new Date('2018-07-31 00:00:00Z'),
          type: 'type2'
        }
      ]})
  })

  it('parses empty script to NA', () => {
    expectCsv({script: ''}).toParseTo({script: 'NA'})
  })
})
