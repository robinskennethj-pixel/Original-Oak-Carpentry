# Google OAuth Setup Guide

## 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen
6. Set up the OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3015` (for development)
   - Authorized redirect URIs: `http://localhost:3015/api/auth/google/callback`

## 2. Environment Variables

Add these to your `.env.local` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3015/api/auth/google/callback

# NextAuth Configuration (optional, for production)
NEXTAUTH_URL=http://localhost:3015
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## 3. Production Setup

For production deployment:

1. Update the authorized origins and redirect URIs in Google Cloud Console
2. Set the production URLs in your environment variables
3. Update the authorized email domains in the API routes:
   - Edit `app/api/auth/google/route.ts`
   - Edit `app/api/auth/google/callback/route.ts`
   - Replace `@yourdomain.com` with your actual domain
   - Add specific admin email addresses

## 4. Security Considerations

- The current implementation includes a mock authentication for development
- In production, validate users against your admin/user database
- Consider implementing role-based access control
- Use HTTPS in production
- Regularly rotate your OAuth secrets

## 5. Testing

1. Start your development server: `npm run dev`
2. Navigate to the admin login page
3. Click "Continue with Google"
4. Complete the OAuth flow
5. Check the browser console for authentication logs

## 6. Customization

You can customize the Google Sign-In component by:
- Modifying the button text and styling in `components/ui/google-sign-in.tsx`
- Adding additional OAuth scopes if needed
- Implementing custom success/error handling
- Adding user profile management features
