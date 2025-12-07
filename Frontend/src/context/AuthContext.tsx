import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../database/schema';
import { authApi } from '../services/auth.api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const token = authApi.getToken();
      const savedUser = authApi.getUser();

      if (token && savedUser) {
        try {
          const response = await authApi.getCurrentUser();
          setUser(response.data.user);
          authApi.setUser(response.data.user);
        } catch (error) {
          console.error('Failed to fetch current user:', error);
          authApi.removeToken();
          authApi.removeUser();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const { user, token } = response.data;

      authApi.setToken(token);
      authApi.setUser(user);
      setUser(user);

      navigate('/');
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = () => {
    authApi.removeToken();
    authApi.removeUser();
    setUser(null);
    navigate('/login');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    authApi.setUser(updatedUser);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
