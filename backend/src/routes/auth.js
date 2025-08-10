import Joi from 'joi'
import User from '../models/User.js'
import { generateUserToken } from '../utils/jwt.js'

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().required().min(2).max(50).messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().min(8).messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters long'
  }),
  role: Joi.string().valid('student', 'teacher', 'admin').default('student').messages({
    'any.only': 'Role must be student, teacher, or admin'
  })
})

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
})

export default async function authRoutes(fastify, options) {
  // Register endpoint
  fastify.post('/register', {
    schema: {
      body: registerSchema,
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' },
                bio: { type: 'string' },
                avatar: { type: 'string' },
                joinDate: { type: 'string' }
              }
            },
            token: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { name, email, password, role } = request.body
      
      // Check if user already exists
      const existingUser = await User.findByEmail(email)
      if (existingUser) {
        return reply.code(400).send({
          error: 'Registration failed',
          message: 'User with this email already exists'
        })
      }
      
      // Create new user
      const user = new User({
        name,
        email,
        password,
        role
      })
      
      await user.save()
      
      // Generate token
      const token = generateUserToken(user)
      
      // Return user data (without password)
      const userResponse = user.getPublicProfile()
      
      return reply.code(201).send({
        success: true,
        message: 'User registered successfully',
        user: userResponse,
        token
      })
      
    } catch (error) {
      fastify.log.error('Registration error:', error)
      
      if (error.code === 11000) {
        return reply.code(400).send({
          error: 'Registration failed',
          message: 'User with this email already exists'
        })
      }
      
      return reply.code(500).send({
        error: 'Registration failed',
        message: 'Internal server error'
      })
    }
  })
  
  // Login endpoint
  fastify.post('/login', {
    schema: {
      body: loginSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                role: { type: 'string' },
                bio: { type: 'string' },
                avatar: { type: 'string' },
                lastActive: { type: 'string' }
              }
            },
            token: { type: 'string' }
          }
        },
        401: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { email, password } = request.body
      
      // Find user by email (include password for comparison)
      const user = await User.findByEmail(email).select('+password')
      
      if (!user) {
        return reply.code(401).send({
          error: 'Login failed',
          message: 'Invalid email or password'
        })
      }
      
      // Check if user is active
      if (!user.isActive) {
        return reply.code(401).send({
          error: 'Login failed',
          message: 'Account is deactivated'
        })
      }
      
      // Verify password
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return reply.code(401).send({
          error: 'Login failed',
          message: 'Invalid email or password'
        })
      }
      
      // Update last active
      user.lastActive = new Date()
      await user.save()
      
      // Generate token
      const token = generateUserToken(user)
      
      // Return user data (without password)
      const userResponse = user.getPublicProfile()
      
      return reply.send({
        success: true,
        message: 'Login successful',
        user: userResponse,
        token
      })
      
    } catch (error) {
      fastify.log.error('Login error:', error)
      
      return reply.code(500).send({
        error: 'Login failed',
        message: 'Internal server error'
      })
    }
  })
  
  // Get current user endpoint
  fastify.get('/me', {
    preHandler: fastify.authenticate
  }, async (request, reply) => {
    try {
      const user = request.user
      
      return reply.send({
        success: true,
        user: user.getPublicProfile()
      })
      
    } catch (error) {
      fastify.log.error('Get user error:', error)
      
      return reply.code(500).send({
        error: 'Failed to get user',
        message: 'Internal server error'
      })
    }
  })
  
  // Logout endpoint (client-side token removal)
  fastify.post('/logout', {
    preHandler: fastify.authenticate
  }, async (request, reply) => {
    try {
      // Update last active before logout
      const user = request.user
      user.lastActive = new Date()
      await user.save()
      
      return reply.send({
        success: true,
        message: 'Logout successful'
      })
      
    } catch (error) {
      fastify.log.error('Logout error:', error)
      
      return reply.code(500).send({
        error: 'Logout failed',
        message: 'Internal server error'
      })
    }
  })
}
