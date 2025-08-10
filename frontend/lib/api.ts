const API_BASE_URL = 'http://localhost:4000/api'

export interface RegisterData {
  name: string
  email: string
  password: string
  role?: 'student' | 'teacher' | 'admin'
}

export interface LoginData {
  email: string
  password: string
}

export interface ProfileData {
  name: string
  email: string
  bio: string
  avatar: string
  role: string
  joinDate: string
  lastActive: string
  department?: string
  specialization?: string
  courses?: string[]
  achievements?: string[]
  certifications?: string[]
  officeHours?: string
  researchInterests?: string[]
  publications?: string[]
  teachingExperience?: number
  studentCount?: number
  courseCount?: number
  averageRating?: number
  completedCourses?: number
  currentCourses?: number
  gpa?: number
  major?: string
  graduationYear?: number
  academicStanding?: string
  advisor?: string
  thesis?: string
  internships?: string[]
  skills?: string[]
  languages?: string[]
  systemAccess?: string[]
  permissions?: string[]
  lastLogin?: string
  ipAddress?: string
  deviceInfo?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user: {
    id: string
    name: string
    email: string
    role: string
    bio: string
    avatar: string
    joinDate: string
  }
  token: string
}

export interface ProfileResponse {
  success: boolean
  message?: string
  user: ProfileData
}

export interface DashboardData {
  metrics: {
    totalUsers: number
    activeUsers: number
    weeklySignups: number
    revenue: number
  }
  charts: {
    weeklyActivity: Array<{
      date: string
      teachers: number
      students: number
      signups: number
    }>
    monthlyGrowth: Array<{
      month: string
      growth: number
      revenue: number
    }>
    roleDistribution: Array<{
      role: string
      count: number
      percentage: number
    }>
  }
  recentActivity: Array<{
    user: string
    action: string
    timestamp: string
    details: any
  }>
}

export interface DashboardResponse {
  success: boolean
  data: DashboardData
}

export interface AdminDashboardData extends DashboardData {
  systemHealth: {
    uptime: number
    memoryUsage: any
    activeConnections: number
    databaseStatus: string
  }
}

export interface TeacherDashboardData extends DashboardData {
  teachingStats: {
    totalStudents: number
    activeStudents: number
    coursesTaught: number
    averageGrade: string
  }
}

// Cookie utilities
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

export const api = {
  // Token management
  setToken(token: string) {
    setCookie('auth_token', token, 7) // 7 days
    localStorage.setItem('token', token) // Keep in localStorage as backup
  },

  getToken(): string | null {
    return getCookie('auth_token') || localStorage.getItem('token')
  },

  removeToken() {
    deleteCookie('auth_token')
    localStorage.removeItem('token')
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Registration failed')
    }

    // Store token in cookie
    this.setToken(result.token)

    return result
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Login failed')
    }

    // Store token in cookie
    this.setToken(result.token)

    return result
  },

  async getProfile(): Promise<ProfileResponse> {
    const token = this.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to get profile')
    }

    return result
  },

  async updateProfile(data: Partial<ProfileData>): Promise<ProfileResponse> {
    const token = this.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to update profile')
    }

    return result
  },

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ success: boolean; message: string }> {
    const token = this.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/profile/password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to change password')
    }

    return result
  },

  async logout() {
    const token = this.getToken()
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        console.error('Logout API call failed:', error)
      }
    }

    // Remove token from cookie and localStorage
    this.removeToken()
    return { success: true }
  },

  async getDashboard(): Promise<DashboardResponse> {
    const token = this.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to get dashboard data')
    }

    return result
  },

  async getAdminDashboard(): Promise<{ success: boolean; data: AdminDashboardData }> {
    const token = this.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/dashboard/admin`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to get admin dashboard data')
    }

    return result
  },

  async getTeacherDashboard(): Promise<{ success: boolean; data: TeacherDashboardData }> {
    const token = this.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/dashboard/teacher`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to get teacher dashboard data')
    }

    return result
  },

  async logActivity(action: string, details?: any): Promise<{ success: boolean; message: string }> {
    const token = this.getToken()
    if (!token) {
      throw new Error('No authentication token found')
    }

    const response = await fetch(`${API_BASE_URL}/dashboard/activity`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, details }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to log activity')
    }

    return result
  }
}
