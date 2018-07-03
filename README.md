# fragmentarium-parser

[![Codeship Status for ElectronicBabylonianLiterature/fragmentarium-parser](https://app.codeship.com/projects/64eda080-6034-0136-217f-124041e5e37d/status?branch=master)](https://app.codeship.com/projects/296226)
[![Test Coverage](https://api.codeclimate.com/v1/badges/971b9239bb9b40f555aa/test_coverage)](https://codeclimate.com/github/ElectronicBabylonianLiterature/fragmentarium-parser/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/971b9239bb9b40f555aa/maintainability)](https://codeclimate.com/github/ElectronicBabylonianLiterature/fragmentarium-parser/maintainability)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A script to transform fragment database exported from FileMaker to JSON format.

The CSV should have the following columns:
```
_id,cdliNumber,bmIdNumber,accession,genre,fincke,publicationPlace,joins,subcollection,description,length,width,thickness,collection,script,date,folio,register,transliteration,notes
```

- `joins` is parsed to and array with ` + ` or `` as separator.
- `folio` is parsed to an array with ` ₤ ` as separator.
- `register` is parsed to an array of objects with ` ₤ ` as separator for array entries and `€` as separator for object properties. The resulting objects will have properties `user`, `date`, and `type`.