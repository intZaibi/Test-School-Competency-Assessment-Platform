import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  type ReactNode,
  type ChangeEvent,
  type FormEvent,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
} from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  Shield,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

// --- Types ---
type UserType = {
  userId?: string;
  name?: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type ProtectedRouteProps = {
  children: ReactNode;
  requireRole?: string | null;
};

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'type'
> & {
  icon?: React.ComponentType<{ className?: string }>;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

type LoginFormProps = {
  onSwitchMode: (mode: string, data?: any) => void;
  onSuccess: () => void;
};

type RegisterFormProps = {
  onSwitchMode: (mode: string, data?: any) => void;
};

type OTPVerificationFormProps = {
  email: string;
  password: string;
  onSwitchMode: (mode: string, data?: any) => void;
  onSuccess: () => void;
};

type ForgotPasswordFormProps = {
  onSwitchMode: (mode: string, data?: any) => void;
};

// --- API Service ---
const API_BASE = 'http://localhost:5000/api/auth';

const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (
    name: string,
    email: string,
    password: string,
    role: string = 'user'
  ) => {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password, role }),
    });
    return response.json();
  },

  verifyOTP: async (email: string, otp: string, password: string) => {
    const response = await fetch(`${API_BASE}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, otp, password }),
    });
    return response.json();
  },

  resendOTP: async (email: string) => {
    const response = await fetch(`${API_BASE}/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  forgotPassword: async (email: string) => {
    const response = await fetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });
    return response.json();
  },

  changePassword: async (
    email: string,
    oldPassword: string,
    newPassword: string
  ) => {
    const response = await fetch(`${API_BASE}/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, oldPassword, newPassword }),
    });
    return response.json();
  },

  getUser: async () => {
    const response = await fetch(`${API_BASE}/get-user`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  refresh: async () => {
    const response = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },
};

// --- Auth Context ---
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuth = async () => {
    try {
      const result = await authService.getUser();
      if (result && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      // Optionally log error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    if (result && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- Protected Route Component ---
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireRole = null,
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  if (requireRole && user?.role !== requireRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-300">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// --- Input Component ---
const Input: React.FC<InputProps> = ({
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
      )}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-12 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm ${className}`}
        {...props}
      />
      {type === 'password' && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

// --- Button Component ---
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses =
    'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group';

  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 disabled:opacity-50',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600',
    ghost: 'text-purple-400 hover:text-purple-300 hover:bg-slate-800/50',
  };

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </button>
  );
};

// --- Auth Form Components ---
const LoginForm: React.FC<LoginFormProps> = ({ onSwitchMode, onSuccess }) => {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result && result.error) {
        setError(result.error);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        icon={Mail}
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        required
      />
      <Input
        icon={Lock}
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        required
      />

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Sign In'}
        <ArrowRight className="w-5 h-5" />
      </Button>

      <div className="text-center space-y-2">
        <button
          type="button"
          onClick={() => onSwitchMode('forgot')}
          className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
        >
          Forgot your password?
        </button>
        <div className="text-slate-400">
          {"Don't have an account? "}
          <button
            type="button"
            onClick={() => onSwitchMode('register')}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  }>({ name: '', email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );
      if (result && result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => {
          onSwitchMode('verify', {
            email: formData.email,
            password: formData.password,
          });
        }, 2000);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
        <h3 className="text-xl font-semibold text-white">
          Registration Successful!
        </h3>
        <p className="text-slate-300">
          Please check your email for the OTP verification code.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        icon={User}
        placeholder="Full name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        required
      />
      <Input
        icon={Mail}
        type="email"
        placeholder="Email address"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        required
      />
      <Input
        icon={Lock}
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        required
      />
      <select
        value={formData.role}
        onChange={(e) =>
          setFormData({ ...formData, role: e.target.value })
        }
        className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          'Create Account'
        )}
        <ArrowRight className="w-5 h-5" />
      </Button>

      <div className="text-center text-slate-400">
        {'Already have an account? '}
        <button
          type="button"
          onClick={() => onSwitchMode('login')}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

const OTPVerificationForm: React.FC<OTPVerificationFormProps> = ({
  email,
  password,
  onSwitchMode,
  onSuccess,
}) => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { checkAuth } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.verifyOTP(email, otp, password);
      if (result && result.error) {
        setError(result.error);
      } else {
        await checkAuth();
        onSuccess();
      }
    } catch (err) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await authService.resendOTP(email);
      alert('OTP sent successfully!');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-white">Verify Your Email</h3>
        <p className="text-slate-300">
          {"We've sent a 6-digit code to "}
          {email}
        </p>
      </div>

      <Input
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        className="text-center text-2xl tracking-widest"
        required
      />

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          'Verify OTP'
        )}
        <CheckCircle className="w-5 h-5" />
      </Button>

      <div className="text-center space-y-2">
        <button
          type="button"
          onClick={handleResendOTP}
          className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
        >
          Resend OTP
        </button>
        <div className="text-slate-400">
          <button
            type="button"
            onClick={() => onSwitchMode('login')}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Back to login
          </button>
        </div>
      </div>
    </form>
  );
};

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSwitchMode,
}) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.forgotPassword(email);
      if (result && result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
        <h3 className="text-xl font-semibold text-white">Reset Email Sent!</h3>
        <p className="text-slate-300">
          Please check your email for the reset code.
        </p>
        <Button onClick={() => onSwitchMode('login')} variant="secondary">
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-white">Reset Password</h3>
        <p className="text-slate-300">
          Enter your email to receive a reset code
        </p>
      </div>

      <Input
        icon={Mail}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          'Send Reset Code'
        )}
        <ArrowRight className="w-5 h-5" />
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => onSwitchMode('login')}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Back to login
        </button>
      </div>
    </form>
  );
};

// --- Main Auth Page ---
const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<
    'login' | 'register' | 'verify' | 'forgot'
  >('login');
  const [formData, setFormData] = useState<any>({});

  const handleModeSwitch = (newMode: string, data: any = {}) => {
    setMode(newMode as typeof mode);
    setFormData(data);
  };

  const handleSuccess = () => {
    // This will be handled by the AuthContext and cause a re-render
  };

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onSwitchMode={handleModeSwitch}
            onSuccess={handleSuccess}
          />
        );
      case 'register':
        return <RegisterForm onSwitchMode={handleModeSwitch} />;
      case 'verify':
        return (
          <OTPVerificationForm
            {...formData}
            onSwitchMode={handleModeSwitch}
            onSuccess={handleSuccess}
          />
        );
      case 'forgot':
        return <ForgotPasswordForm onSwitchMode={handleModeSwitch} />;
      default:
        return (
          <LoginForm
            onSwitchMode={handleModeSwitch}
            onSuccess={handleSuccess}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="relative w-full max-w-md">
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'register' && 'Create Account'}
              {mode === 'verify' && 'Verify Email'}
              {mode === 'forgot' && 'Reset Password'}
            </h1>
            <p className="text-slate-400">
              {mode === 'login' && 'Sign in to your account'}
              {mode === 'register' && 'Join us today'}
              {mode === 'verify' && 'Complete your registration'}
              {mode === 'forgot' && "We'll help you reset it"}
            </p>
          </div>

          {renderForm()}
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Component (Example Protected Content) ---
const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-slate-300">
                Welcome back, {user?.name}!
              </p>
            </div>
            <Button onClick={logout} variant="secondary">
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                User ID
              </h3>
              <p className="text-slate-300">{user?.userId}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Email
              </h3>
              <p className="text-slate-300">{user?.email}</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Role
              </h3>
              <p className="text-slate-300 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [currentView] = useState<'protected' | 'admin'>('protected');

  return (
    <AuthProvider>
      <div className="App">
        {currentView === 'protected' && (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )}
        {currentView === 'admin' && (
          <ProtectedRoute requireRole="admin">
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
            </div>
          </ProtectedRoute>
        )}
      </div>
    </AuthProvider>
  );
};

export default App;