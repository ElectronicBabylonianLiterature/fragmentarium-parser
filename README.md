# fragmentarium-parser

[![Build Status](https://travis-ci.com/ElectronicBabylonianLiterature/fragmentarium-parser.svg?branch=master)](https://travis-ci.com/ElectronicBabylonianLiterature/fragmentarium-parser)
[![Test Coverage](https://api.codeclimate.com/v1/badges/971b9239bb9b40f555aa/test_coverage)](https://codeclimate.com/github/ElectronicBabylonianLiterature/fragmentarium-parser/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/971b9239bb9b40f555aa/maintainability)](https://codeclimate.com/github/ElectronicBabylonianLiterature/fragmentarium-parser/maintainability)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A script to transform fragment database exported from FileMaker to JSON format.

Usage:
```
node index.js <path to the CSV file>
```

The CSV must contain a header and have the following columns:
```
_id,cdliNumber,bmIdNumber,accession,genre,fincke,publication,joins,subcollection,description,length,width,thickness,collection,script,date,folios,record,transliteration,notes,museum
```

- `joins` is parsed to and array with ` + ` or `\u000b` as separator.
- `folios` is parsed to an array with ` ₤ ` as separator.
- `record` is parsed to an array of objects with ` ₤ ` as separator for array entries and `€` as separator for object properties. The resulting objects will have properties `user`, `date`, and `type`.
- `\u000b` outside `joins` is parsed to `\n`.
- `\u000b` in the beginning of string is omitted.

## Scripts

- `scripts/expandFolioNumbers.js` expands folio numbers in range format (e.g. `08927-8`) to individual entries.

