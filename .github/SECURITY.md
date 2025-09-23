# Security Policy

## Reporting Security Vulnerabilities

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability within this project, please follow these steps:

1. **Email Security Reports**: Send an email to `security@oguncarpentry.com`
2. **Include Details**: Provide detailed information about the vulnerability including:
   - Type of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)
3. **Response Time**: We will acknowledge receipt within 48 hours and provide regular updates on the progress

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Best Practices

### For Developers
- Never commit sensitive data (API keys, passwords, etc.)
- Always use environment variables for configuration
- Keep dependencies updated
- Use HTTPS in production
- Implement proper input validation
- Follow OWASP security guidelines

### For Deployment
- Use secure hosting providers
- Enable SSL/TLS certificates
- Implement proper CORS policies
- Use secure headers
- Regular security audits
- Monitor for vulnerabilities

## Environment Variables Security

Ensure these variables are properly secured:
- `SMTP_PASS` - Email service password
- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - Authentication secret
- Any API keys or third-party service credentials

## Contact

For security-related questions or concerns:
- Email: security@oguncarpentry.com
- Do not use public issues for security reports

## Acknowledgments

We appreciate responsible disclosure of security vulnerabilities and will work with researchers to address issues promptly. Thank you for helping keep Ogun Carpentry secure.