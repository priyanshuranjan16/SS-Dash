'use client'

import { motion } from 'framer-motion'

export const AuthTransition = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}