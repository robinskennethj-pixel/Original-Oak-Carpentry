'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { GoogleSignIn } from '@/components/ui/google-sign-in'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAdminAuth } from '@/lib/admin-auth' // Import the new auth hook

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isLoading } = useAdminAuth() // Use the login function from the hook
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')


    const success = await login(username, password)

    if (success) {
      router.push('/admin') // Redirect to admin dashboard on successful login
    } else {
      setError('Invalid username or password')
    }
  }

  const handleGoogleSuccess = async (user: any) => {
    setError('')
    
    // For now, we'll treat Google sign-in as successful admin login
    // In production, you'd validate the Google user against your admin list
    if (user.email && user.email.includes('@')) {
      router.push('/admin')
    } else {
      setError('Google sign-in failed. Please try again.')
    }
  }

  const handleGoogleError = (error: string) => {
    setError(error)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-secondary/10 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/ORIGINAL OAK CARPENTRY - FULL-WEBSITE-LOGO.png"
              alt="Original Oak Carpentry Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-primary">Original Oak</span> Admin
          </h1>
          <p className="text-muted-foreground mt-2">Business Portal Login</p>
        </div>

        <Card className="border-primary/20">
          <CardHeader className="text-center">
            <CardTitle>Administrator Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    console.log('Username onChange:', e.target.value)
                    setUsername(e.target.value)
                  }}
                  required
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    console.log('Password onChange:', e.target.value)
                    setPassword(e.target.value)
                  }}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Google Sign-In */}
              <GoogleSignIn
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                className="w-full"
                disabled={isLoading}
              />
              
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            This area is for authorized personnel only. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}
