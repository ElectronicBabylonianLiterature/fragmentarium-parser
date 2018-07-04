const _ = require('lodash')
module.exports = function cleanNewLines (object) {
  return _.mapValues(object, value =>
    _.isString(value)
      ? value
        .replace(/^\u000b/, '')
        .replace(/\u000b/g, '\n')
      : value
  )
}
