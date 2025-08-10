import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from 'fastify-jwt'
import dotenv from 'dotenv'

import { connectDatabase } from './config/database.js'
import { authenticate, requireRole, requirePermission, optionalAuth } from './middleware/auth.js'
import authRoutes from './routes/auth.js'
import profileRoutes from './routes/profile.js'
import dashboardRoutes from './routes/dashboard.js'

dotenv.config()

const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || 'development'

// Create Fastify instance
const fastify = Fastify({
  logger: {
    level: NODE_ENV === 'development' ? 'info' : 'warn'
  },
  trustProxy: true
})

// Register plugins
await fastify.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
})

await fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key'
})

// GraphQL temporarily disabled for debugging
// await fastify.register(mercurius, {
//   schema: typeDefs,
//   resolvers,
//   graphiql: NODE_ENV === 'development',
//   context: async (request) => {
//     return { user: request.user }
//   }
// })

// Register authentication middleware
fastify.decorate('authenticate', authenticate)
fastify.decorate('requireRole', requireRole)
fastify.decorate('requirePermission', requirePermission)
fastify.decorate('optionalAuth', optionalAuth)

// Register routes
await fastify.register(authRoutes, { prefix: '/api/auth' })
await fastify.register(profileRoutes, { prefix: '/api' })
await fastify.register(dashboardRoutes, { prefix: '/api' })

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV
  }
})

// Root endpoint
fastify.get('/', async (request, reply) => {
  return {
    message: 'D Dash Backend API',
    version: '1.0.0',
    environment: NODE_ENV,
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      dashboard: '/api/dashboard',
      health: '/health'
    }
  }
})

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error)
  
  // Handle GraphQL errors
  if (error.extensions) {
    return reply.send({
      errors: [{
        message: error.message,
        extensions: error.extensions
      }]
    })
  }
  
  // Handle validation errors
  if (error.validation) {
    return reply.code(400).send({
      error: 'Validation Error',
      message: error.message,
      details: error.validation
    })
  }
  
  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return reply.code(401).send({
      error: 'Authentication Error',
      message: 'Invalid token'
    })
  }
  
  if (error.name === 'TokenExpiredError') {
    return reply.code(401).send({
      error: 'Authentication Error',
      message: 'Token expired'
    })
  }
  
  // Default error response
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'
  
  reply.code(statusCode).send({
    error: 'Server Error',
    message: NODE_ENV === 'development' ? message : 'Something went wrong'
  })
})

// Not found handler
fastify.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    error: 'Not Found',
    message: `Route ${request.method}:${request.url} not found`
  })
})

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  fastify.log.info(`Received ${signal}. Starting graceful shutdown...`)
  
  try {
    await fastify.close()
    fastify.log.info('Fastify server closed')
    process.exit(0)
  } catch (error) {
    fastify.log.error('Error during shutdown:', error)
    process.exit(1)
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Start server
const start = async () => {
  try {
    // Connect to database
    await connectDatabase()
    
    // Start server
    await fastify.listen({ 
      port: PORT, 
      host: '0.0.0.0' 
    })
    
    fastify.log.info(`🚀 Server running on port ${PORT}`)
    fastify.log.info(`🏥 Health check: http://localhost:${PORT}/health`)
    
  } catch (error) {
    fastify.log.error('Error starting server:', error)
    process.exit(1)
  }
}

start()
