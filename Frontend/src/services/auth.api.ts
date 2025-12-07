import { httpService } from './http.service';
import { User } from '../database/schema';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  role?: 'admin' | 'internal' | 'external';
  department_id?: string;
  job_title?: string;
  phone?: string;
  location?: string;
}

interface AuthResponse {
  status: string;
  data: {
    user: User;
    token: string;
  };
}

interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return httpService.post<AuthResponse>('/auth/login', credentials);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return httpService.post<AuthResponse>('/auth/register', data);
  },

  async getCurrentUser(): Promise<UserResponse> {
    return httpService.get<UserResponse>('/auth/me');
  },

  async logout(): Promise<void> {
    return httpService.post<void>('/auth/logout');
  },

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  removeToken() {
    localStorage.removeItem('authToken');
  },

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  removeUser() {
    localStorage.removeItem('user');
  },
};
