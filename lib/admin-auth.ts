'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Simple client-side authentication for admin section
// In production, this should be replaced with proper server-side authentication

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = sessionStorage.getItem('adminAuthenticated')
    const loginTime = sessionStorage.getItem('adminLoginTime')

    if (authStatus === 'true' && loginTime) {
      // Check if session has expired (24 hours)
      const loginTimestamp = parseInt(loginTime)
      const now = Date.now()
      const sessionDuration = 24 * 60 * 60 * 1000 // 24 hours

      if (now - loginTimestamp < sessionDuration) {
        setIsAuthenticated(true)
      } else {
        // Session expired, clear storage
        sessionStorage.removeItem('adminAuthenticated')
        sessionStorage.removeItem('adminLoginTime')
        setIsAuthenticated(false)
      }
    } else {
      setIsAuthenticated(false)
    }

    setIsLoading(false)
  }, [])

  const login = (username: string, password: string): boolean => {
    const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'oak2024'

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuthenticated', 'true')
      sessionStorage.setItem('adminLoginTime', Date.now().toString())
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    sessionStorage.removeItem('adminLoginTime')
    setIsAuthenticated(false)
    router.push('/admin/login')
  }

  const checkAuth = () => {
    if (!isAuthenticated && !isLoading) {
      router.push('/admin/login')
      return false
    }
    return true
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  }
}

// Hook to protect admin pages
export function useProtectedAdmin() {
  const { isAuthenticated, isLoading, checkAuth } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      checkAuth()
    }
  }, [isAuthenticated, isLoading, pathname, checkAuth])

  return { isAuthenticated, isLoading }
}