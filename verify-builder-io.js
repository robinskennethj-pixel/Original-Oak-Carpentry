// Direct Builder.io API verification
const https = require('https');

console.log('🔍 Verifying Builder.io integration...');
const apiKey = process.env.BUILDER_PUBLIC_KEY;
if (!apiKey) {
  console.error('❌ BUILDER_PUBLIC_KEY environment variable not set');
  process.exit(1);
}
console.log('🔑 API Key:', apiKey.substring(0, 8) + '...');

const options = {
  hostname: 'cdn.builder.io',
  path: `/api/v2/content/page?apiKey=${apiKey}&limit=1`,
  method: 'GET',
  headers: {
    'User-Agent': 'Original-Oak-Carpentry-MCP-Test'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  console.log(`📡 HTTP Status: ${res.statusCode}`);
  console.log(`📡 Headers: ${JSON.stringify(res.headers, null, 2)}`);

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`📊 Response Length: ${data.length} bytes`);

    try {
      const parsed = JSON.parse(data);

      if (res.statusCode === 200) {
        console.log('✅ Builder.io API is responding correctly');
        console.log(`📊 Found ${parsed.results?.length || 0} content items`);

        if (parsed.results && parsed.results.length > 0) {
          console.log('📝 Sample content:', parsed.results[0].name || parsed.results[0].id);
        }

        console.log('✅ Builder.io integration is WORKING');
      } else {
        console.log('❌ Builder.io API error:');
        console.log('📤 Response:', parsed);

        if (res.statusCode === 401) {
          console.log('🔑 Invalid API key - check Builder.io dashboard');
        }
      }
    } catch (e) {
      console.log('❌ Failed to parse JSON response');
      console.log('📤 Raw response:', data.substring(0, 200));
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Network error:', error.message);
});

req.end();