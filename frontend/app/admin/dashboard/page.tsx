'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Calendar, Search, Users, BookOpen, TrendingUp, Filter, Download, LogOut, Shield, UserCheck, GraduationCap, Clock, Target, Award, MessageSquare, Star, BarChart3, FileText, Database, Settings, Activity, Zap } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ComposedChart, FunnelChart, Funnel, Cell as FunnelCell } from 'recharts'
import { useAuth } from '../../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { RoleNav } from '../../../components/ui/role-nav'

// Admin-specific mock data
const systemPerformanceData = [
  { time: '00:00', cpu: 45, memory: 62, disk: 28, network: 35 },
  { time: '04:00', cpu: 38, memory: 58, disk: 30, network: 42 },
  { time: '08:00', cpu: 72, memory: 75, disk: 45, network: 68 },
  { time: '12:00', cpu: 85, memory: 82, disk: 52, network: 78 },
  { time: '16:00', cpu: 78, memory: 79, disk: 48, network: 72 },
  { time: '20:00', cpu: 65, memory: 71, disk: 38, network: 58 },
  { time: '24:00', cpu: 52, memory: 65, disk: 32, network: 45 },
]

const userGrowthData = [
  { month: 'Jan', students: 1200, teachers: 45, admins: 8, total: 1253 },
  { month: 'Feb', students: 1350, teachers: 52, admins: 8, total: 1410 },
  { month: 'Mar', students: 1480, teachers: 58, admins: 9, total: 1547 },
  { month: 'Apr', students: 1620, teachers: 65, admins: 9, total: 1694 },
  { month: 'May', students: 1780, teachers: 72, admins: 10, total: 1862 },
  { month: 'Jun', students: 1950, teachers: 78, admins: 10, total: 2038 },
]

const platformAnalytics = [
  { metric: 'Active Users', value: 2847, change: '+12%', trend: 'up' },
  { metric: 'Course Completions', value: 1256, change: '+8%', trend: 'up' },
  { metric: 'System Uptime', value: 99.8, change: '+0.2%', trend: 'up' },
  { metric: 'Support Tickets', value: 23, change: '-15%', trend: 'down' },
  { metric: 'Data Usage', value: 85.2, change: '+5%', trend: 'up' },
]

const userDistribution = [
  { role: 'Students', count: 1950, color: '#3b82f6' },
  { role: 'Teachers', count: 78, color: '#10b981' },
  { role: 'Admins', count: 10, color: '#ef4444' },
  { role: 'Guests', count: 45, color: '#f59e0b' },
]

const securityMetrics = [
  { metric: 'Failed Login Attempts', value: 12, severity: 'low' },
  { metric: 'Suspicious Activities', value: 3, severity: 'medium' },
  { metric: 'Data Breach Attempts', value: 0, severity: 'none' },
  { metric: 'System Vulnerabilities', value: 2, severity: 'low' },
  { metric: 'Security Patches', value: 15, severity: 'good' },
]

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 28000, profit: 17000 },
  { month: 'Feb', revenue: 52000, expenses: 32000, profit: 20000 },
  { month: 'Mar', revenue: 61000, expenses: 35000, profit: 26000 },
  { month: 'Apr', revenue: 58000, expenses: 33000, profit: 25000 },
  { month: 'May', revenue: 72000, expenses: 40000, profit: 32000 },
  { month: 'Jun', revenue: 68000, expenses: 38000, profit: 30000 },
]

const userFunnel = [
  { name: 'Total Visitors', value: 10000, fill: '#3b82f6' },
  { name: 'Registered Users', value: 3500, fill: '#10b981' },
  { name: 'Active Users', value: 2847, fill: '#f59e0b' },
  { name: 'Premium Users', value: 1256, fill: '#ef4444' },
]

const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b']

export default function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [dateRange, setDateRange] = useState('7d')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !user) {
      router.push('/login')
    }
  }, [mounted, user, router])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const summaryMetrics = [
    {
      title: 'Total Users',
      value: '2,038',
      change: '+185',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'System Uptime',
      value: '99.8%',
      change: '+0.2%',
      trend: 'up',
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Revenue',
      value: '$68K',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Courses',
      value: '156',
      change: '+8',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-amber-500'
    }
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <motion.div 
      className="min-h-screen bg-background p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Administrator
              </Badge>
            </div>
            <p className="text-muted-foreground">Welcome back, {user.name || user.email}! Monitor system performance and platform analytics.</p>
          </div>
          <motion.div 
            className="flex gap-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </motion.div>
        </motion.div>

        {/* Role-based Navigation */}
        <RoleNav />

        {/* Filters */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>

          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
        </motion.div>

        {/* Summary Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {summaryMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${metric.color}`}>
                    <metric.icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <span className={`text-${metric.trend === 'up' ? 'green' : metric.trend === 'down' ? 'red' : 'blue'}-500`}>
                      {metric.change}
                    </span>
                    from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* System Performance */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time system resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={systemPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cpu" 
                      stackId="1" 
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="memory" 
                      stackId="1" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Growth */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Platform user growth over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="students" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="teachers" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Additional Charts */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {/* User Distribution */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Current user roles breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={userDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Platform Analytics */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={platformAnalytics} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis type="number" />
                    <YAxis dataKey="metric" type="category" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Revenue Analysis */}
        <motion.div 
          className="grid grid-cols-1 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Monthly revenue, expenses, and profit trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Funnel */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>User Conversion Funnel</CardTitle>
              <CardDescription>User journey from visitor to premium user</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <FunnelChart data={userFunnel}>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Funnel dataKey="value" data={userFunnel} isAnimationActive>
                    {userFunnel.map((entry, index) => (
                      <FunnelCell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Metrics */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Security Overview</CardTitle>
              <CardDescription>System security metrics and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{metric.metric}</p>
                        <p className="text-sm text-muted-foreground">
                          {metric.severity === 'none' ? 'No issues detected' : 
                           metric.severity === 'low' ? 'Low priority' :
                           metric.severity === 'medium' ? 'Medium priority' : 'High priority'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={metric.severity === 'none' ? 'default' : 
                                metric.severity === 'low' ? 'secondary' :
                                metric.severity === 'medium' ? 'destructive' : 'destructive'}
                        className="text-xs"
                      >
                        {metric.value}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {metric.severity}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent System Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
              <CardDescription>Latest administrative actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { activity: 'System Backup Completed', time: '2 hours ago', type: 'maintenance', status: 'success' },
                  { activity: 'New User Registration Batch', time: '4 hours ago', type: 'user-management', status: 'info' },
                  { activity: 'Security Patch Applied', time: '6 hours ago', type: 'security', status: 'success' },
                  { activity: 'Database Optimization', time: '1 day ago', type: 'maintenance', status: 'success' },
                  { activity: 'Failed Login Attempt Detected', time: '1 day ago', type: 'security', status: 'warning' },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={activity.status === 'success' ? 'default' : 
                                activity.status === 'warning' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
