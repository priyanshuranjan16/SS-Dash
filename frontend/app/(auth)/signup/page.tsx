'use client'

import { useState, useEffect } from 'react'
import { AuthCard } from '../../../components/auth/auth-card'
import { AuthForm } from '../../../components/auth/auth-form'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '../../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { api } from '../../../lib/api'

export default function SignupPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function onSubmit(values: { name?: string; email: string; password: string; role?: "student" | "teacher" | "admin" }) {
    try {
      setIsLoading(true)
      setError(null)
      console.log('Signup values:', values)
      
      // Call your backend API using the api utility
      if (!values.name) {
        throw new Error('Name is required')
      }
      
      const data = await api.register({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role || 'student'
      })

      console.log('Registration successful:', data)
      
      // Token is automatically stored in cookie by the API
      // Store user data in localStorage for context
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // Auto-login with the received data
      await login(values.email, values.password, values.role)
      
      // Redirect based on selected role
      const targetRole = values.role || 'student'
      switch (targetRole) {
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'teacher':
          router.push('/teacher/dashboard')
          break
        case 'student':
        default:
          router.push('/dashboard')
          break
      }
    } catch (error) {
      console.error('Signup failed:', error)
      setError(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }
  // <PasswordStrength password={form.watch('password')} />

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md mx-auto p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md mx-auto p-6">
        <AuthCard
          title="Create an account"
          description="Enter your details to create a new account"
        >
          {error && (
            <motion.div
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          <AuthForm type="signup" onSubmit={onSubmit} />
          <motion.p 
            className="px-8 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Already have an account?{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign in
              </Link>
            </motion.span>
          </motion.p>
        </AuthCard>
      </div>
    </motion.div>
  )
}