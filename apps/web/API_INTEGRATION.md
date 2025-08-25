# LinkLens API Integration

This document describes the API integration between the Next.js frontend and NestJS backend.

## Architecture Overview

### Frontend Structure

```
apps/web/src/
├── lib/
│   └── api/
│       ├── index.ts          # Main exports
│       ├── types.ts          # TypeScript interfaces
│       ├── client.ts         # HTTP client with auth handling
│       └── auth.ts           # Authentication service
├── hooks/
│   ├── index.ts              # Hook exports
│   ├── useApi.ts             # Generic API hook
│   └── useForm.ts            # Form handling hook
└── app/
    ├── sign-up/page.tsx      # Registration page
    ├── sign-in/page.tsx      # Login page
    └── dashboard/page.tsx    # Protected dashboard
```

### API Services

#### AuthService (`/lib/api/auth.ts`)

- `register(userData)` - Register new user
- `login(credentials)` - Login user and store token
- `logout()` - Clear authentication token
- `isAuthenticated()` - Check if user is logged in
- `getAuthToken()` - Get current auth token

#### ApiClient (`/lib/api/client.ts`)

- HTTP client with automatic token handling
- Error handling with custom ApiError class
- Support for GET, POST, PUT, DELETE methods
- Automatic JSON parsing and CORS handling

### Custom Hooks

#### useApi Hook

```typescript
const { execute, isLoading, error, fieldErrors } = useApi();

const handleSubmit = async () => {
  const result = await execute(() => authService.register(data));
  if (result) {
    // Success handling
  }
};
```

#### useForm Hook

```typescript
const { values, errors, handleChange, handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  validate: values => validateForm(values),
  onSubmit: async values => {
    await authService.login(values);
  },
});
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Required Data Formats

#### Registration

```typescript
{
  firstname: string;
  lastname?: string;
  email: string;
  password: string; // Min 8 chars, must contain uppercase, lowercase, and number
}
```

#### Login

```typescript
{
  email: string;
  password: string;
}
```

## Environment Configuration

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend

- Port: 3001
- Global prefix: `/api`
- CORS enabled for frontend origin

## Error Handling

The system includes comprehensive error handling:

1. **Network Errors**: Connection issues, timeouts
2. **Validation Errors**: Field-specific validation messages
3. **Authentication Errors**: 401 Unauthorized responses
4. **Conflict Errors**: 409 for duplicate email addresses
5. **Server Errors**: 500 Internal server errors

## Authentication Flow

1. User submits registration/login form
2. Frontend validates data locally
3. API call made to backend
4. On success:
   - Token stored in localStorage
   - User redirected to dashboard
5. On error:
   - Specific error messages displayed
   - Form fields highlighted

## Features Implemented

✅ **User Registration**

- First name, last name, email, password fields
- Client-side validation matching backend requirements
- Password strength requirements
- Duplicate email handling

✅ **User Login**

- Email and password authentication
- Remember me functionality
- Success message display from registration

✅ **Protected Routes**

- Dashboard requires authentication
- Automatic redirect to login if not authenticated
- Token-based authentication

✅ **Error Handling**

- Field-specific error messages
- Network error handling
- Server validation error display

✅ **UI/UX**

- Consistent design with sign-up page
- Loading states during API calls
- Success/error message display
- Responsive design

## Security Features

- JWT token-based authentication
- Automatic token attachment to requests
- Secure token storage in localStorage
- CORS protection
- Password strength validation
- Input sanitization

## Development Setup

1. Start the API server:

   ```bash
   cd apps/api
   npm run start:dev
   ```

2. Start the frontend:

   ```bash
   cd apps/web
   npm run dev
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - API: http://localhost:3001/api

## Testing the Integration

1. Navigate to http://localhost:3000/sign-up
2. Fill in the registration form with valid data
3. Submit the form - should redirect to sign-in with success message
4. Use the same credentials to sign in
5. Should redirect to dashboard upon successful login
6. Dashboard shows protected content and logout functionality
