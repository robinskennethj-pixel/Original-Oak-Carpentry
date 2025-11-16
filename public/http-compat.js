/**
 * HTTP Compatibility Script for Localhost Admin
 * Prevents HTTPS auto-upgrades and ensures HTTP-only for localhost
 */
(function() {
  'use strict';

  // Check if we're on localhost
  const isLocalhost = window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname === '0.0.0.0';

  if (isLocalhost && window.location.protocol === 'https:') {
    // Force redirect to HTTP for localhost
    window.location.protocol = 'http:';
    return;
  }

  // Prevent Service Worker HTTPS upgrades
  if ('serviceWorker' in navigator) {
    const originalRegister = navigator.serviceWorker.register;
    navigator.serviceWorker.register = function(scriptURL, options) {
      // Force HTTP URLs for localhost
      if (isLocalhost && scriptURL.includes('localhost') && scriptURL.startsWith('https:')) {
        scriptURL = scriptURL.replace(/^https:/, 'http:');
      }
      return originalRegister.call(this, scriptURL, options);
    };
  }

  // Override fetch to prevent HTTPS upgrades
  const originalFetch = window.fetch;
  window.fetch = function(input, init) {
    let url = input;
    if (typeof input === 'string') {
      url = input;
    } else if (input instanceof Request) {
      url = input.url;
    }

    // Force HTTP for localhost URLs
    if (isLocalhost && url.includes('localhost') && url.startsWith('https:')) {
      url = url.replace(/^https:/, 'http:');

      if (typeof input === 'string') {
        input = url;
      } else if (input instanceof Request) {
        // Recreate request with new URL
        const newRequest = new Request(url, {
          method: input.method,
          headers: input.headers,
          body: input.body,
          mode: input.mode,
          credentials: input.credentials,
          cache: input.cache,
          redirect: input.redirect,
          referrer: input.referrer,
          referrerPolicy: input.referrerPolicy,
          integrity: input.integrity,
          keepalive: input.keepalive,
          signal: init?.signal
        });
        input = newRequest;
      }
    }

    return originalFetch.call(this, input, init);
  };

  // Override XMLHttpRequest to prevent HTTPS upgrades
  const OriginalXMLHttpRequest = window.XMLHttpRequest;
  window.XMLHttpRequest = function() {
    const xhr = new OriginalXMLHttpRequest();
    const originalOpen = xhr.open;

    xhr.open = function(method, url, async, user, password) {
      // Force HTTP for localhost URLs
      if (isLocalhost && url.includes('localhost') && url.startsWith('https:')) {
        url = url.replace(/^https:/, 'http:');
      }
      return originalOpen.call(this, method, url, async, user, password);
    };

    return xhr;
  };

  // Prevent meta tag HTTPS upgrades
  const metaTags = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]');
  metaTags.forEach(tag => {
    const content = tag.getAttribute('content');
    if (content && content.includes('upgrade-insecure-requests')) {
      tag.setAttribute('content', content.replace(/upgrade-insecure-requests/, ''));
    }
  });

  // Remove any existing upgrade-insecure-requests meta tags
  const upgradeMeta = document.querySelector('meta[http-equiv="upgrade-insecure-requests"]');
  if (upgradeMeta) {
    upgradeMeta.remove();
  }

  // Add HTTP meta tag to prevent HTTPS upgrades
  const httpMeta = document.createElement('meta');
  httpMeta.setAttribute('http-equiv', 'Content-Security-Policy');
  httpMeta.setAttribute('content', "default-src 'self' 'unsafe-inline' 'unsafe-eval' http: ws:; style-src 'self' 'unsafe-inline' http:; img-src 'self' data: http:; connect-src 'self' http: ws:;");
  document.head.appendChild(httpMeta);

  // Add form action meta for HTTP
  const formMeta = document.createElement('meta');
  formMeta.setAttribute('http-equiv', 'Content-Security-Policy');
  formMeta.setAttribute('content', "form-action 'self' http://localhost:3015;");
  document.head.appendChild(formMeta);

  // Prevent mixed content errors
  window.addEventListener('error', function(event) {
    if (event.message && event.message.includes('mixed content')) {
      console.log('Bypassed mixed content error for localhost development');
      event.preventDefault();
    }
  });

  console.log('HTTP Compatibility script loaded - localhost HTTP support enabled');
})();