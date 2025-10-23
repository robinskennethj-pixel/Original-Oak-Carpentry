// Test script for Builder.io integration
const builder = require('@builder.io/react');

// Use environment variable for API key
const BUILDER_PUBLIC_KEY = process.env.BUILDER_PUBLIC_KEY;
if (!BUILDER_PUBLIC_KEY) {
  console.error('❌ BUILDER_PUBLIC_KEY environment variable not set');
  process.exit(1);
}

builder.init(BUILDER_PUBLIC_KEY);

async function testBuilderIO() {
  try {
    console.log('🧪 Testing Builder.io integration...');

    // Test basic connectivity
    const content = await builder
      .get('page', {
        url: '/',
        cacheSeconds: 60,
        enrich: true,
        includeRefs: true
      })
      .promise();

    if (content) {
      console.log('✅ Builder.io connection successful!');
      console.log('📄 Content found:', content.id || 'Homepage content');
    } else {
      console.log('⚠️  No content found for homepage - this is normal if no content is published');
    }

  } catch (error) {
    console.error('❌ Builder.io test failed:', error.message);
    if (error.message.includes('Invalid API key')) {
      console.log('🔑 Please check your BUILDER_PUBLIC_KEY in .env.local');
    }
  }
}

// Run the test
testBuilderIO();