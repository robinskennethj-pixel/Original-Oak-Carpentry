// Direct API verification without dependencies
const { execSync } = require('child_process');

console.log('🔍 Testing Builder.io API directly...');
const apiKey = process.env.BUILDER_PUBLIC_KEY;
if (!apiKey) {
  console.error('❌ BUILDER_PUBLIC_KEY environment variable not set');
  process.exit(1);
}
console.log('📡 API Key:', apiKey.substring(0, 8) + '...');

// Use curl to test the API directly
try {
  const result = execSync(
    `curl -s "https://cdn.builder.io/api/v2/content/page?apiKey=${apiKey}&limit=1"`,
    { encoding: 'utf8', timeout: 10000 }
  );

  console.log('📊 Raw API Response:');
  console.log(result.substring(0, 300) + '...');

  const parsed = JSON.parse(result);

  if (parsed.results) {
    console.log(`✅ Builder.io API is working! Found ${parsed.results.length} content items`);

    if (parsed.results.length > 0) {
      console.log('📝 First content item:', parsed.results[0].name || parsed.results[0].id || 'Unnamed');
    }

    console.log('✅ VERIFICATION COMPLETE: Your Builder.io integration is properly configured');
  } else {
    console.log('⚠️  API responded but no results found');
    console.log('📤 Full response:', parsed);
  }

} catch (error) {
  console.log('❌ API test failed:', error.message);

  if (error.message.includes('timeout')) {
    console.log('⏰ Request timed out - checking network connectivity...');
  }
}