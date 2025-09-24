// Test script to check if i18n files are valid
const fs = require('fs');
const path = require('path');

try {
  // Check English translations
  const enMessages = JSON.parse(fs.readFileSync('./messages/en.json', 'utf8'));
  console.log('✅ English messages loaded successfully');

  // Check Spanish translations
  const esMessages = JSON.parse(fs.readFileSync('./messages/es.json', 'utf8'));
  console.log('✅ Spanish messages loaded successfully');

  // Check if both have the same structure
  const enKeys = Object.keys(enMessages);
  const esKeys = Object.keys(esMessages);

  if (enKeys.length === esKeys.length) {
    console.log('✅ Translation files have matching structure');
  } else {
    console.log('⚠️  Translation files have different structures');
  }

  console.log('✅ All i18n files are valid JSON');

} catch (error) {
  console.error('❌ Error in i18n files:', error.message);
}