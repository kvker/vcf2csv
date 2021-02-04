const fs = require('fs')

const str = fs.readFileSync('test.vcf')
var QuotedPrintable = require('@vlasky/quoted-printable');
var string = str;
var options = { qEncoding: false };
var bufferEncoded = Buffer.from(string, 'ascii');
var buffer = QuotedPrintable.decode(bufferEncoded, options);
const result = '姓名,电话\r\n' + buffer.toString('utf-8').replace(/BEGIN[\w\W]*?(.{2,4});;;;[\W\w]*?CELL:(\d+)/g, '$1,$2').replace(/\r\nEND:VCARD/g, '').replace(/E?\:/g, '').replace(/TEL;CELL/g, '').replace(/TEL;WORK/g, '')
console.log(result)
fs.writeFileSync('result.csv', result, {encoding:'utf-8'})