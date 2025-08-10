'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'student' | 'teacher' | 'admin'

interface User {
  id: string
  email: string
  role: UserRole
  name?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role?: UserRole) => Promise<User>
  logout: () => void
  isLoading: boolean
  hasPermission: (permission: string) => boolean
  isRole: (role: UserRole) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Permission mapping for different roles
const rolePermissions: Record<UserRole, string[]> = {
  student: [
    'view:dashboard',
    'view:own-courses',
    'submit:assignments',
    'view:own-grades'
  ],
  teacher: [
    'view:dashboard',
    'view:own-courses',
    'create:courses',
    'edit:own-courses',
    'grade:assignments',
    'view:students',
    'manage:own-students'
  ],
  admin: [
    'view:dashboard',
    'view:all-courses',
    'create:courses',
    'edit:all-courses',
    'delete:courses',
    'view:all-users',
    'manage:users',
    'manage:roles',
    'view:analytics',
    'manage:system'
  ]
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session/token
    const checkAuth = async () => {
      try {
        // Get token from cookie
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth-token='))
          ?.split('=')[1]

        if (token) {
          // Simulate role detection from token
          let role: UserRole = 'student'
          if (token.includes('admin')) {
            role = 'admin'
          } else if (token.includes('teacher')) {
            role = 'teacher'
          }

          const mockUser: User = {
            id: '1',
            email: 'demo@example.com',
            role,
            name: 'Demo User'
          }
          setUser(mockUser)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, role?: UserRole): Promise<User> => {
    setIsLoading(true)
    try {
      // Here you would make an API call to authenticate
      // For demo purposes, we'll use the provided role or fallback to email-based detection
      let userRole: UserRole = role || 'student'
      
      // If no role provided, fallback to email-based detection
      if (!role) {
        if (email.includes('admin')) {
          userRole = 'admin'
        } else if (email.includes('teacher')) {
          userRole = 'teacher'
        }
      }

      const mockUser: User = {
        id: Date.now().toString(),
        email,
        role: userRole,
        name: email.split('@')[0]
      }

      // Store token in cookie (for middleware compatibility)
      const token = `mock-token-${userRole}`
      document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
      setUser(mockUser)
      
      return mockUser
    } catch (error) {
      throw new Error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Remove cookie
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    setUser(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return rolePermissions[user.role].includes(permission)
  }

  const isRole = (role: UserRole): boolean => {
    return user?.role === role
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    hasPermission,
    isRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
