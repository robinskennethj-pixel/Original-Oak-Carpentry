// Simple Builder.io connectivity test
const https = require('https');

const BUILDER_API_KEY = 'f69f90f8f0f040edaa5dbcebaf45727f';
const BUILDER_API_URL = 'https://cdn.builder.io/api/v2/content/page';

function testBuilderAPI() {
  console.log('🧪 Testing Builder.io API connectivity...');
  console.log('🔑 Using API key:', BUILDER_API_KEY.substring(0, 8) + '...');

  const url = `${BUILDER_API_URL}?apiKey=${BUILDER_API_KEY}&limit=1`;

  https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);

        if (res.statusCode === 200) {
          console.log('✅ Builder.io API connection successful!');
          console.log('📊 Results found:', response.results?.length || 0);

          if (response.results && response.results.length > 0) {
            console.log('📝 Sample content:', response.results[0].name || 'Unnamed content');
          }
        } else {
          console.log('❌ Builder.io API error:', response.message || `HTTP ${res.statusCode}`);

          if (res.statusCode === 401) {
            console.log('🔑 Invalid API key - please check your Builder.io dashboard');
          }
        }
      } catch (error) {
        console.log('❌ Failed to parse response:', error.message);
      }
    });
  }).on('error', (error) => {
    console.log('❌ Network error:', error.message);
  });
}

testBuilderAPI();