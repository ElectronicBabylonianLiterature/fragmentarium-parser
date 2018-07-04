const cleanNewLines = require('../lib/cleanNewLines')

describe('cleanNewLines', () => {
  it('converts \\u000b to \\n', () => {
    expect(cleanNewLines({data: 'foo\u000bbar\u000bbaz'})).toEqual({data: 'foo\nbar\nbaz'})
  })

  it('does not alter non strings', () => {
    expect(cleanNewLines({data: 123})).toEqual({data: 123})
  })

  it('removes \\u000b from beginning of a string', () => {
    expect(cleanNewLines({data: '\u000bfoo'})).toEqual({data: 'foo'})
  })
})
