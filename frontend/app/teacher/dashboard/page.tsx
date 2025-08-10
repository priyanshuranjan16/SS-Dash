'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Calendar, Search, Users, BookOpen, TrendingUp, Filter, Download, LogOut, Shield, UserCheck, GraduationCap, Clock, Target, Award, MessageSquare, Star, BarChart3, FileText } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ComposedChart } from 'recharts'
import { useAuth } from '../../../contexts/auth-context'
import { useRouter } from 'next/navigation'
import { RoleNav } from '../../../components/ui/role-nav'

// Teacher-specific mock data
const studentPerformanceData = [
  { student: 'Alice Johnson', course: 'CS101', grade: 92, attendance: 95, participation: 88 },
  { student: 'Bob Smith', course: 'CS101', grade: 78, attendance: 82, participation: 75 },
  { student: 'Carol Davis', course: 'CS201', grade: 85, attendance: 90, participation: 92 },
  { student: 'David Wilson', course: 'CS201', grade: 91, attendance: 88, participation: 85 },
  { student: 'Eva Brown', course: 'CS301', grade: 89, attendance: 92, participation: 90 },
  { student: 'Frank Miller', course: 'CS301', grade: 76, attendance: 85, participation: 78 },
]

const courseAnalytics = [
  { course: 'CS101: Programming', students: 45, avgGrade: 85.2, completion: 92, satisfaction: 4.6 },
  { course: 'CS201: Data Structures', students: 38, avgGrade: 82.1, completion: 89, satisfaction: 4.4 },
  { course: 'CS301: Algorithms', students: 32, avgGrade: 87.5, completion: 94, satisfaction: 4.7 },
  { course: 'CS401: Software Engineering', students: 28, avgGrade: 83.8, completion: 91, satisfaction: 4.5 },
]

const weeklyTeachingHours = [
  { day: 'Mon', hours: 6, classes: 3, officeHours: 2 },
  { day: 'Tue', hours: 8, classes: 4, officeHours: 1 },
  { day: 'Wed', hours: 5, classes: 2, officeHours: 3 },
  { day: 'Thu', hours: 7, classes: 3, officeHours: 2 },
  { day: 'Fri', hours: 4, classes: 2, officeHours: 1 },
  { day: 'Sat', hours: 2, classes: 0, officeHours: 0 },
  { day: 'Sun', hours: 1, classes: 0, officeHours: 0 },
]

const studentEngagement = [
  { metric: 'Class Participation', value: 85, target: 90 },
  { metric: 'Assignment Completion', value: 92, target: 95 },
  { metric: 'Office Hours Attendance', value: 78, target: 80 },
  { metric: 'Discussion Forum Activity', value: 88, target: 85 },
  { metric: 'Peer Collaboration', value: 82, target: 85 },
]

const gradeDistribution = [
  { grade: 'A', count: 45, color: '#10b981' },
  { grade: 'B', count: 62, color: '#3b82f6' },
  { grade: 'C', count: 28, color: '#f59e0b' },
  { grade: 'D', count: 8, color: '#ef4444' },
  { grade: 'F', count: 3, color: '#dc2626' },
]

const teachingEfficiency = [
  { month: 'Jan', efficiency: 85, studentSatisfaction: 4.2, workload: 75 },
  { month: 'Feb', efficiency: 88, studentSatisfaction: 4.4, workload: 78 },
  { month: 'Mar', efficiency: 92, studentSatisfaction: 4.6, workload: 82 },
  { month: 'Apr', efficiency: 89, studentSatisfaction: 4.5, workload: 80 },
  { month: 'May', efficiency: 94, studentSatisfaction: 4.7, workload: 85 },
  { month: 'Jun', efficiency: 91, studentSatisfaction: 4.6, workload: 83 },
]

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#dc2626']

export default function TeacherDashboardPage() {
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
      title: 'Total Students',
      value: '143',
      change: '+8',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Courses',
      value: '4',
      change: 'Current',
      trend: 'stable',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Avg Student Grade',
      value: '85.2%',
      change: '+2.1%',
      trend: 'up',
      icon: GraduationCap,
      color: 'bg-purple-500'
    },
    {
      title: 'Teaching Hours',
      value: '33',
      change: '+3',
      trend: 'up',
      icon: Clock,
      color: 'bg-amber-500'
    }
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
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
              <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
              <Badge variant="secondary" className="flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                Teacher
              </Badge>
            </div>
            <p className="text-muted-foreground">Welcome back, {user.name || user.email}! Monitor your teaching performance and student progress.</p>
          </div>
          <motion.div 
            className="flex gap-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
            <Button size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Class
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
              placeholder="Search students..."
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
            <option value="7d">This Week</option>
            <option value="30d">This Month</option>
            <option value="semester">This Semester</option>
          </select>

          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter Students
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
          {/* Course Analytics */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Course Analytics</CardTitle>
                <CardDescription>Performance metrics across your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={courseAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis dataKey="course" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="avgGrade" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Teaching Hours */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Weekly Teaching Schedule</CardTitle>
                <CardDescription>Your teaching hours and office hours distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={weeklyTeachingHours}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="hours" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="classes" stroke="#10b981" strokeWidth={2} />
                  </ComposedChart>
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
          {/* Grade Distribution */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Overall grade breakdown across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
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

          {/* Student Engagement */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>Student Engagement Metrics</CardTitle>
                <CardDescription>Current engagement levels vs targets</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={studentEngagement} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="metric" type="category" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="target" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Teaching Efficiency Trend */}
        <motion.div 
          className="grid grid-cols-1 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Teaching Efficiency Trend</CardTitle>
              <CardDescription>Your teaching performance over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teachingEfficiency}>
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
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="studentSatisfaction" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student Performance Scatter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Analysis</CardTitle>
              <CardDescription>Grade vs Attendance correlation across students</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={studentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis dataKey="attendance" name="Attendance %" />
                  <YAxis dataKey="grade" name="Grade" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Scatter dataKey="grade" fill="#8b5cf6" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Teaching Activity */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Teaching Activity</CardTitle>
              <CardDescription>Your latest teaching activities and student interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { activity: 'Graded CS301 Final Projects', time: '2 hours ago', type: 'grading', students: 32 },
                  { activity: 'Office Hours - CS201 Students', time: '1 day ago', type: 'office-hours', students: 8 },
                  { activity: 'Updated Course Syllabus', time: '2 days ago', type: 'admin', students: null },
                  { activity: 'Student Feedback Review', time: '3 days ago', type: 'feedback', students: 45 },
                  { activity: 'Research Paper Submission', time: '1 week ago', type: 'research', students: null },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {activity.students && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.students} students
                        </Badge>
                      )}
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
