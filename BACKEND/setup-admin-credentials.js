const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const rawjson = fs.readFileSync(path.join(__dirname, 'data', 'admin.json'));
const credentials = JSON.parse(rawjson);

console.log(credentials);

credentials.password = bcrypt.hashSync('yellow', 8);

fs.writeFileSync(path.join(__dirname, 'data', 'admin.json'), JSON.stringify(credentials, undefined, 2));