/* globals db */
function expandFragment (fragment) {
  const expanded = []
  fragment.folios.forEach(folio => {
    if (folio.number.includes('-')) {
      expanded.push(...expandFolio(folio))
    } else {
      expanded.push(folio)
    }
  })
  return {
    _id: fragment._id,
    folios: expanded
  }
}

function expandFolio (folio) {
  const { digits, start, end } = parseFolioNumber(folio.number)
  const expanded = []
  for (let number = start; number <= end; number++) {
    expanded.push({
      name: folio.name,
      number: toPaddedString(number, digits)
    })
  }
  return expanded
}

function parseFolioNumber (folioNumber) {
  const [startString, endString] = folioNumber.split('-')
  const digits = startString.length
  const endDigits = endString.length
  const fullEndString = startString.substring(0, digits - endDigits) + endString
  return {
    digits: digits,
    start: Number(startString),
    end: Number(fullEndString)
  }
}

function toPaddedString (number, padLength) {
  let result = String(number)
  while (result.length < padLength) {
    result = '0' + result
  }
  return result
}

function setFolios (fragment) {
  db.getCollection('fragments').update(
    { _id: fragment._id },
    { $set: { folios: fragment.folios } }
  )
}

db.getCollection('fragments')
  .find({ 'folios.number': /-/ })
  .map(expandFragment)
  .forEach(setFolios)
