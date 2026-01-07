// Usage: node set_sudo_hash.js <password>
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const pwd = process.argv[2];
if (!pwd) {
  console.error('Provide password as first argument');
  process.exit(2);
}
const hash = crypto.createHash('sha256').update(pwd).digest('hex');
const file = path.join(__dirname, 'sudo_secret.json');
fs.writeFileSync(file, JSON.stringify({ hash }, null, 2), { encoding: 'utf8' });
console.log('Wrote hash to', file);
