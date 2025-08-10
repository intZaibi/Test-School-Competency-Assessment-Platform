# Redux Implementation with RTK Query

This document describes the Redux implementation using RTK Query for the School Assessment application.

## Overview

The application now uses Redux Toolkit with RTK Query for state management and API calls. This provides:

- Centralized state management
- Automatic caching and invalidation
- Optimistic updates
- Loading and error states
- TypeScript support

## File Structure

```
src/
├── features/
│   ├── api/
│   │   ├── authApi.ts          # Authentication API endpoints
│   │   └── assessmentApi.ts    # Assessment API endpoints
│   └── slicers/
│       ├── authSlice.ts        # Authentication state slice
│       └── assessmentSlice.ts  # Assessment state slice
├── utils/
│   ├── store.ts               # Redux store configuration
│   └── hooks.ts               # Typed Redux hooks
```

## API Services

### Authentication API (`authApi.ts`)

**Endpoints:**
- `login` - User login
- `register` - User registration
- `verifyOTP` - OTP verification
- `resendOTP` - Resend OTP
- `forgotPassword` - Password reset request
- `changePassword` - Change password
- `getUser` - Get current user
- `refresh` - Refresh token
- `logout` - User logout

**Usage:**
```typescript
import { useLoginMutation, useGetUserQuery } from '../features/api/authApi';

// In component
const [login, { isLoading }] = useLoginMutation();
const { data: user, isLoading: userLoading } = useGetUserQuery();

const handleLogin = async () => {
  try {
    const result = await login({ email, password }).unwrap();
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Assessment API (`assessmentApi.ts`)

**Endpoints:**
- `createAssessment` - Create new assessment
- `getAllAssessments` - Get all assessments
- `getQuestionsByLevel` - Get questions by step and level
- `submitAssessment` - Submit assessment results
- `generateCertificate` - Generate certificate

**Usage:**
```typescript
import { useGetQuestionsByLevelQuery, useSubmitAssessmentMutation } from '../features/api/assessmentApi';

// In component
const { data: questions, isLoading } = useGetQuestionsByLevelQuery({
  step: 'step1',
  level: 'level1'
});
const [submitAssessment] = useSubmitAssessmentMutation();

const handleSubmit = async () => {
  try {
    await submitAssessment({ step: 'step1', level: 'level1', score: 85 }).unwrap();
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## State Slices

### Authentication Slice (`authSlice.ts`)

**State:**
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

**Actions:**
- `setUser` - Set authenticated user
- `clearUser` - Clear user data
- `setLoading` - Set loading state
- `setError` - Set error message
- `clearError` - Clear error message

### Assessment Slice (`assessmentSlice.ts`)

**State:**
```typescript
interface AssessmentState {
  currentStep: number;
  currentLevel: number;
  score: number;
  questions: Question[];
  answers: Record<string, string>;
  certificate: CertificateData;
  isLoading: boolean;
  error: string | null;
}
```

**Actions:**
- `setCurrentStep` - Set current assessment step
- `setCurrentLevel` - Set current assessment level
- `setQuestions` - Set assessment questions
- `setAnswer` - Set answer for a question
- `setScore` - Set assessment score
- `setCertificate` - Set certificate data
- `setLoading` - Set loading state
- `setError` - Set error message
- `clearError` - Clear error message
- `resetAssessment` - Reset assessment state

## Store Configuration

The store is configured in `store.ts` with:

- Redux Toolkit's `configureStore`
- RTK Query middleware
- TypeScript support with proper typing

```typescript
const store = configureStore({
  reducer: {
    auth: authReducer,
    assessment: assessmentReducer,
    [authApi.reducerPath]: authApi.reducer,
    [assessmentApi.reducerPath]: assessmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      assessmentApi.middleware
    ),
});
```

## Custom Hooks

Use the typed hooks from `hooks.ts`:

```typescript
import { useAppDispatch, useAppSelector } from '../utils/hooks';

// Instead of useDispatch and useSelector
const dispatch = useAppDispatch();
const user = useAppSelector((state) => state.auth.user);
```

## Usage Examples

### Login Component
```typescript
import { useLoginMutation } from '../features/api/authApi';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { setUser, setError, clearError } from '../features/slicers/authSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    
    try {
      const result = await login(form).unwrap();
      dispatch(setUser(result.user));
      navigate('/dashboard');
    } catch (err: any) {
      dispatch(setError(err.data?.error || 'Login failed'));
    }
  };

  return (
    // JSX with error display and loading state
  );
};
```

### Assessment Component
```typescript
import { useGetQuestionsByLevelQuery, useSubmitAssessmentMutation } from '../features/api/assessmentApi';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { setQuestions, setAnswer, setScore } from '../features/slicers/assessmentSlice';

const Assessment = () => {
  const dispatch = useAppDispatch();
  const { questions, answers, currentStep } = useAppSelector((state) => state.assessment);
  
  const { data: currentQuestions } = useGetQuestionsByLevelQuery({
    step: `step${currentStep}`,
    level: 'level1'
  });
  
  const [submitAssessment] = useSubmitAssessmentMutation();

  useEffect(() => {
    if (currentQuestions) {
      dispatch(setQuestions(currentQuestions));
    }
  }, [currentQuestions, dispatch]);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleSubmit = async () => {
    try {
      await submitAssessment({
        step: `step${currentStep}`,
        level: 'level1',
        score: calculateScore()
      }).unwrap();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    // JSX with questions and answers
  );
};
```

## Benefits

1. **Type Safety**: Full TypeScript support with proper typing
2. **Automatic Caching**: RTK Query handles caching automatically
3. **Loading States**: Built-in loading and error states
4. **Optimistic Updates**: Can implement optimistic updates easily
5. **DevTools**: Redux DevTools integration for debugging
6. **Performance**: Automatic memoization and re-render optimization

## Backend Integration

The API services are configured to work with the existing backend endpoints:

- **Base URL**: `http://localhost:3000/api`
- **Credentials**: Included for JWT cookie handling
- **Error Handling**: Proper error handling with try-catch blocks

## Next Steps

1. Update remaining components to use the new Redux implementation
2. Add more sophisticated error handling
3. Implement optimistic updates where appropriate
4. Add persistence for user authentication state
5. Add more assessment features using the API services
