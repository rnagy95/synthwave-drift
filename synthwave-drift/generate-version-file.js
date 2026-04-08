const { version } = require('./package.json');
const fs = require('fs');

const content = `{"APP_VERSION": "${version}"}`;

fs.writeFileSync('public/version.json', content);
console.log('Version file generated:', version);
