const path = require('path');
const fs = require('fs');
const hashUtils = require('../utils/hash');

const secretFile = path.join(__dirname, '..', '..', 'sudo_secret.json');

function loadHash() {
  try {
    const raw = fs.readFileSync(secretFile, 'utf8');
    const obj = JSON.parse(raw);
    return typeof obj.hash === 'string' && obj.hash.length > 0 ? obj.hash : null;
  } catch (e) {
    return null;
  }
}

exports.verify = (req, res) => {
  const { password } = req.body || {};
  if (typeof password !== 'string') return res.status(400).json({ ok: false });
  const storedHash = loadHash();
  if (!storedHash) return res.status(500).json({ ok: false, error: 'no_secret' });
  const hash = hashUtils.sha256(password);
  if (hash === storedHash) return res.json({ ok: true });
  return res.json({ ok: false });
};
