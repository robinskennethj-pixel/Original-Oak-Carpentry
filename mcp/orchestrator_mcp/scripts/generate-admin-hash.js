#!/usr/bin/env node
// scripts/generate-admin-hash.js
const bcrypt = require('bcryptjs');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node generate-admin-hash.js <password>');
  console.error('Example: node generate-admin-hash.js "YourSecurePassword123!"');
  process.exit(1);
}

try {
  const hash = bcrypt.hashSync(password, 10);
  console.log('\n🔐 Generated Admin Password Hash:');
  console.log(hash);
  console.log('\n📋 Add this to your .env.production file:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log('\n⚠️  NEVER commit this hash to version control!');
} catch (error) {
  console.error('❌ Error generating hash:', error.message);
  process.exit(1);
}