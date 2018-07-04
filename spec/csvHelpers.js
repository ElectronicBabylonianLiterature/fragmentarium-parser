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

function buildCsv (...rowParams) {
  const objects = rowParams.map(params => ({
    ...csvDefaults,
    ...params
  }))

  return [
    '_id,cdliNumber,bmIdNumber,accession,genre,fincke,publication,joins,subcollection,description,length,width,thickness,collection,script,date,folio,record,transliteration,notes',
    ...objects.map(object => `"${object._id}","${object.cdliNumber}","${object.bmIdNumber}","${object.accession}","${object.genre}","${object.fincke}","${object.publication}","${object.joins}","${object.subcollection}","${object.description}","${object.length}","${object.width}","${object.thickness}","${object.collection}","${object.script}","${object.date}","${object.folio}","${object.record}","${object.transliteration}","${object.notes}"`)
  ].join('\n')
}

module.exports = {
  buildObject,
  buildCsv
}
