const _ = require('lodash')
module.exports = function cleanNewLines (object) {
  return _.mapValues(object, value =>
    _.isString(value)
      ? value
        .replace(/^\u000b/, '') // eslint-disable-line no-control-regex
        .replace(/\u000b/g, '\n') // eslint-disable-line no-control-regex
      : value
  )
}
