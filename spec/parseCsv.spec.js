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
