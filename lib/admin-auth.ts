'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthUser {
  username: string;
  role: string;
  permissions: string[];
}

interface AuthResponse {
  authenticated: boolean;
  user?: AuthUser;
}

/**
 * Enhanced admin authentication hook with server-side validation
 * Replaces client-side only authentication with secure server-side checks
 */
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<AuthUser | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  /**
   * Check authentication status with server-side validation
   */
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'GET',
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json() as AuthResponse
        setIsAuthenticated(data.authenticated)
        setUser(data.user || null)

        if (!data.authenticated && pathname?.startsWith('/admin')) {
          router.push('/admin-login')
        }
      } else {
        setIsAuthenticated(false)
        setUser(null)
        if (pathname?.startsWith('/admin')) {
          router.push('/admin-login')
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
      setUser(null)
      if (pathname?.startsWith('/admin')) {
        router.push('/admin-login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Login with server-side authentication
   */
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      console.log('Login attempt:', { username, password: '***' })
      const requestBody = { username, password }
      console.log('Request body:', JSON.stringify(requestBody))
      console.log('Username type:', typeof username, 'Password type:', typeof password)
      console.log('Username value:', username, 'Password length:', password?.length)

      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include', // Include cookies in request
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (response.ok) {
        const data = await response.json()
        console.log('Response data:', data)
        if (data.success) {
          await checkAuthStatus() // Refresh auth status
          return true
        }
      } else {
        const errorText = await response.text()
        console.error('Login failed with status:', response.status, 'Error:', errorText)
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Logout with server-side session termination
   */
  const logout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsAuthenticated(false)
      setUser(null)
      router.push('/admin-login')
    }
  }

  /**
   * Refresh authentication status
   */
  const refreshAuth = async () => {
    await checkAuthStatus()
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    refreshAuth
  }
}

/**
 * Hook to protect admin pages - ENHANCED VERSION
 */
export function useProtectedAdmin() {
  const { isAuthenticated, isLoading } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname?.startsWith('/admin')) {
      router.push('/admin-login')
    }
  }, [isAuthenticated, isLoading, pathname, router])

  return { isAuthenticated, isLoading }
}