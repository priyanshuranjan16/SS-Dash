# Error Handling System Documentation

## Overview

This application implements a comprehensive error handling system that provides user-friendly error messages and redirects users to appropriate pages when errors occur.

## Error Types Handled

### 1. 404 Not Found Errors
- **File**: `app/not-found.tsx`
- **Triggered**: When users visit non-existent routes
- **Features**:
  - Clear error message explaining what happened
  - List of possible reasons for the error
  - Links to Dashboard and Home page
  - Animated UI with Framer Motion

### 2. Runtime Errors
- **File**: `app/error.tsx`
- **Triggered**: When runtime errors occur in the application
- **Features**:
  - Error details display
  - Try Again button to reset the error
  - Link to Dashboard
  - Error logging for debugging

### 3. Global Errors
- **File**: `app/global-error.tsx`
- **Triggered**: When critical errors occur at the root level
- **Features**:
  - Critical error handling
  - App restart functionality
  - Link to Home page

### 4. Unauthorized Access
- **File**: `app/unauthorized/page.tsx`
- **Triggered**: When users try to access pages they don't have permission for
- **Features**:
  - Shows required roles vs user's current role
  - Explains why access was denied
  - Redirects to appropriate dashboard based on user role
  - Role-based navigation suggestions

### 5. Not Implemented Pages
- **Component**: `components/ui/not-implemented.tsx`
- **Triggered**: For pages that exist but aren't fully implemented
- **Features**:
  - Development status information
  - Estimated completion dates
  - Links to Dashboard and Home
  - Professional "under construction" message

## Components

### ErrorBoundary Component
```typescript
import { ErrorBoundary } from './components/ui/error-boundary'

// Wrap any component to catch errors
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**Features**:
- Catches JavaScript errors in component trees
- Logs error information
- Displays fallback UI
- Provides recovery options

### ErrorMessage Component
```typescript
import { ErrorMessage } from './components/ui/error-message'

// Different variants available
<ErrorMessage 
  title="Custom Error"
  message="Something went wrong"
  variant="inline" // or "card" or "full"
  showDashboardLink={true}
  onDismiss={() => console.log('dismissed')}
/>
```

**Variants**:
- `inline`: Small inline error message
- `card`: Card-based error display
- `full`: Full-screen error page

### NotImplemented Component
```typescript
import { NotImplemented } from './components/ui/not-implemented'

<NotImplemented
  pageName="Feature Name"
  description="What this feature will do"
  estimatedCompletion="Q1 2024"
  showDashboardLink={true}
  showHomeLink={true}
/>
```

## Middleware Integration

The middleware (`middleware.ts`) handles unauthorized access by:
1. Checking user authentication
2. Validating user roles against required permissions
3. Redirecting unauthorized users to `/unauthorized` with detailed information
4. Providing context about what went wrong

## Usage Examples

### 1. Protecting Routes
```typescript
// In middleware.ts
const protectedRoutes = {
  '/admin/dashboard': ['admin'],
  '/teacher/dashboard': ['teacher', 'admin'],
  '/dashboard': ['student', 'teacher', 'admin']
}
```

### 2. Using Error Boundaries
```typescript
// Wrap individual components
<ErrorBoundary onError={(error, errorInfo) => {
  console.error('Component error:', error, errorInfo)
}}>
  <DashboardChart />
</ErrorBoundary>
```

### 3. Displaying Error Messages
```typescript
// Inline error
<ErrorMessage 
  variant="inline"
  title="Connection Error"
  message="Failed to connect to server"
/>

// Full page error
<ErrorMessage 
  variant="full"
  title="Critical Error"
  message="Application cannot continue"
/>
```

### 4. Not Implemented Pages
```typescript
// For pages under development
export default function CoursesPage() {
  return (
    <NotImplemented
      pageName="Course Management"
      description="Course creation and management features"
      estimatedCompletion="Q1 2024"
    />
  )
}
```

## Error Flow

1. **User visits non-existent route** → `not-found.tsx`
2. **Runtime error occurs** → `error.tsx`
3. **Critical error** → `global-error.tsx`
4. **Unauthorized access** → `unauthorized/page.tsx`
5. **Not implemented page** → `NotImplemented` component

## Dashboard Redirects

All error pages include links to the dashboard:
- **Students**: `/dashboard`
- **Teachers**: `/teacher/dashboard`
- **Admins**: `/admin/dashboard`

The system automatically determines the correct dashboard based on user role.

## Customization

### Adding New Error Types
1. Create new error page in `app/` directory
2. Add route handling in middleware if needed
3. Update error boundaries as necessary

### Styling Error Pages
All error pages use:
- Consistent design system
- Framer Motion animations
- Responsive layout
- Dark/light mode support

### Error Logging
- Console logging for development
- Can be extended to external services
- Error IDs for tracking

## Best Practices

1. **Always provide recovery options** - Users should be able to navigate away from errors
2. **Use clear, friendly language** - Avoid technical jargon
3. **Include relevant context** - Show what went wrong and why
4. **Provide multiple navigation options** - Dashboard, Home, Back buttons
5. **Log errors appropriately** - For debugging without exposing sensitive information
6. **Test error scenarios** - Ensure error pages work in all conditions

## Testing Error Handling

### Manual Testing
1. Visit non-existent routes (e.g., `/nonexistent`)
2. Try accessing admin pages as a student
3. Trigger JavaScript errors in components
4. Test error boundary recovery

### Automated Testing
```typescript
// Example test for error boundary
test('ErrorBoundary catches errors', () => {
  const ThrowError = () => {
    throw new Error('Test error')
  }
  
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  )
  
  expect(screen.getByText('Component Error')).toBeInTheDocument()
})
```

## Error Recovery

The system provides multiple recovery mechanisms:
1. **Try Again** - Reset error state
2. **Go to Dashboard** - Navigate to user's dashboard
3. **Go Home** - Return to home page
4. **Dismiss** - Close error messages
5. **Contact Support** - For persistent issues

This comprehensive error handling system ensures users always have a clear path forward when errors occur.
