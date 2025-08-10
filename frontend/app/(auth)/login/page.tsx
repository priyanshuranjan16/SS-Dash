'use client'

import { useState, useEffect } from 'react'
import { AuthCard } from '../../../components/auth/auth-card'
import { AuthForm } from '../../../components/auth/auth-form'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '../../../contexts/auth-context'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function onSubmit(values: { email: string; password: string; role?: "student" | "teacher" | "admin" }) {
    try {
      const user = await login(values.email, values.password, values.role)
      
      // Get redirect URL from query params or use default based on role
      const searchParams = new URLSearchParams(window.location.search)
      const redirectTo = searchParams.get('redirect')
      
      if (redirectTo) {
        router.push(redirectTo)
      } else {
        // Redirect based on role
        switch (user.role) {
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
      }
    } catch (error) {
      console.error('Login failed:', error)
      // Handle error (show toast, etc.)
    }
  }

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
          title="Welcome back"
          description="Enter your email to sign in to your account"
        >
          <AuthForm type="login" onSubmit={onSubmit} />
          <motion.p 
            className="px-8 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            Don't have an account?{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                Sign up
              </Link>
            </motion.span>
          </motion.p>
        </AuthCard>
      </div>
    </motion.div>
  )
}