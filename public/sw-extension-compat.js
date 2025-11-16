/**
 * Extension Compatibility Service Worker
 * Handles Chrome extension message passing and prevents async response errors
 */

const CACHE_NAME = 'extension-compat-v1';
const EXTENSION_ORIGINS = [
  'chrome-extension://',
  'moz-extension://',
  'safari-extension://',
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Extension compatibility service worker installed');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Extension compatibility service worker activated');
  event.waitUntil(self.clients.claim());
});

// Fetch event - handle extension requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle extension requests
  if (EXTENSION_ORIGINS.some(origin => url.origin.startsWith(origin))) {
    event.respondWith(handleExtensionRequest(request));
  }
});

// Message event - handle extension messages with proper async handling
self.addEventListener('message', (event) => {
  const { data, source, ports } = event;

  // Handle extension messages
  if (data && data.type === 'EXTENSION_MESSAGE') {
    // Use immediate response to prevent async timeout
    try {
      const result = handleExtensionMessage(data, source, ports);
      // Return true to indicate async response if needed
      if (result === true) {
        event.waitUntil(Promise.resolve());
      }
    } catch (error) {
      console.error('Extension message handling error:', error);
      // Send immediate error response to prevent channel closure
      if (ports && ports.length > 0) {
        try {
          ports[0].postMessage({
            type: 'ERROR',
            messageId: data.messageId,
            error: error.message,
            timestamp: Date.now(),
          });
        } catch (portError) {
          console.error('Failed to send error response through port:', portError);
        }
      }
    }
  }

  // Handle compatibility requests
  if (data && data.type === 'COMPATIBILITY_CHECK') {
    // Immediate response to prevent async timeout
    try {
      if (event.ports && event.ports.length > 0) {
        event.ports[0].postMessage({
          type: 'COMPATIBILITY_RESPONSE',
          compatible: true,
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      console.error('Compatibility check error:', error);
    }
  }
});

/**
 * Handle extension requests with proper CORS and compatibility
 */
async function handleExtensionRequest(request) {
  try {
    // Clone the request to modify headers
    const modifiedRequest = new Request(request, {
      headers: {
        ...Object.fromEntries(request.headers),
        'X-Extension-Compatible': 'true',
        'X-Service-Worker': 'extension-compat',
      },
    });

    // Fetch the response
    const response = await fetch(modifiedRequest);

    // Clone the response to modify headers
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Extension-Compatible',
        'Access-Control-Allow-Credentials': 'true',
        'X-Extension-Compatible': 'true',
      },
    });

    return modifiedResponse;
  } catch (error) {
    console.error('Extension request handling error:', error);

    // Return a compatible error response
    return new Response(JSON.stringify({
      error: 'Extension request failed',
      message: error.message,
      timestamp: Date.now(),
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Extension-Compatible': 'true',
      },
    });
  }
}

/**
 * Enhanced extension message handler with robust async response handling
 * FIXED: Prevents "A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received"
 */
function handleExtensionMessage(data, source, ports) {
  const { messageId, type, payload } = data;

  // Track if response has been sent
  let responseSent = false;

  // Create safe response function to prevent double responses
  const safeSendResponse = (response) => {
    if (responseSent) {
      console.warn('Response already sent for message:', messageId);
      return;
    }
    responseSent = true;

    if (ports && ports.length > 0) {
      try {
        ports[0].postMessage({
          ...response,
          messageId,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error('Failed to send response:', error);
      }
    }
  };

  // Set up timeout for async operations
  const responseTimeout = setTimeout(() => {
    if (!responseSent) {
      console.warn('Message handler timeout for:', messageId);
      safeSendResponse({
        type: 'ERROR',
        error: 'Message handler timeout',
      });
    }
  }, 10000); // 10 second timeout

  try {
    // Process the message based on type
    switch (type) {
      case 'PING':
        // Respond immediately to ping - NO ASYNC OPERATIONS
        clearTimeout(responseTimeout);
        safeSendResponse({
          type: 'PONG',
        });
        break;

      case 'COMPATIBILITY_CHECK':
        // Check compatibility - IMMEDIATE RESPONSE
        clearTimeout(responseTimeout);
        safeSendResponse({
          type: 'COMPATIBILITY_RESPONSE',
          compatible: true,
          features: [
            'message-passing',
            'cors-handling',
            'async-response',
            'chrome-extension-fix',
            'mcp-integration',
            'timeout-handling',
            'double-response-prevention'
          ],
        });
        break;

      case 'MCP_REQUEST':
        // Handle MCP requests - ASYNC with proper response handling
        setTimeout(async () => {
          try {
            const { endpoint, data } = payload;
            const response = await handleMCPRequest(endpoint, data);
            clearTimeout(responseTimeout);
            safeSendResponse({
              type: 'MCP_RESPONSE',
              data: response,
            });
          } catch (error) {
            clearTimeout(responseTimeout);
            safeSendResponse({
              type: 'ERROR',
              error: error.message || 'MCP request failed',
            });
          }
        }, 0);
        return true; // Indicate async response

      case 'ASYNC_REQUEST':
        // Handle async requests with proper response - USE setTimeout to prevent blocking
        setTimeout(async () => {
          try {
            const result = await handleAsyncRequest(payload, messageId);
            clearTimeout(responseTimeout);
            safeSendResponse({
              type: 'ASYNC_RESPONSE',
              data: result,
            });
          } catch (error) {
            clearTimeout(responseTimeout);
            safeSendResponse({
              type: 'ERROR',
              error: error.message || 'Async request failed',
            });
          }
        }, 0);
        return true; // Indicate async response

      default:
        // Unknown message type - IMMEDIATE RESPONSE
        clearTimeout(responseTimeout);
        safeSendResponse({
          type: 'ERROR',
          error: 'Unknown message type: ' + type,
        });
    }
  } catch (error) {
    console.error('Extension message handling error:', error);
    clearTimeout(responseTimeout);

    // Send error response - IMMEDIATE
    safeSendResponse({
      type: 'ERROR',
      error: error.message || 'Message handling error',
    });
  }
}

/**
 * Handle MCP requests with proper response handling
 */
async function handleMCPRequest(endpoint, data) {
  try {
    // Forward request to MCP orchestrator on port 3015
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Extension-Compatible': 'true',
        'X-Service-Worker': 'extension-compat',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return {
      success: response.ok,
      data: result,
      error: response.ok ? null : result.error || 'MCP request failed',
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to communicate with MCP orchestrator',
      status: 500,
    };
  }
}

/**
 * Handle async requests with proper response handling
 */
async function handleAsyncRequest(payload, messageId) {
  try {
    // Simulate async processing
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
      processed: true,
      payload,
      messageId,
      timestamp: Date.now(),
    };
  } catch (error) {
    throw new Error('Async request processing failed: ' + error.message);
  }
}

// Handle sync messages from clients
self.addEventListener('sync', (event) => {
  console.log('Sync event:', event.tag);
});

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('Push event:', event);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click:', event);
});

console.log('Extension compatibility service worker loaded');