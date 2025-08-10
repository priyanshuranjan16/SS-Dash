'use client'

import { useState, useEffect } from 'react'
import { AuthCard } from '../../../components/auth/auth-card'
import { AuthForm } from '../../../components/auth/auth-form'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '../../../contexts/auth-context'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function onSubmit(values: { email: string; password: string; role?: "student" | "teacher" | "admin" }) {
    try {
      // In a real app, you would send signup data to your backend
      // For demo purposes, we'll simulate signup and auto-login
      console.log('Signup values:', values)
      
      // Simulate successful signup and auto-login with the selected role
      const user = await login(values.email, values.password, values.role)
      
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
      // Handle error (show toast, etc.)
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
          description="Enter your email to create a new account"
        >
          <AuthForm type="signup" onSubmit={onSubmit} />
          <motion.p 
            className="px-8 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            Already have an account?{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary transition-colors"
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