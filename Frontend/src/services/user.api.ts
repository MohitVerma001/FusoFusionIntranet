import { httpService } from './http.service';
import { User } from '../database/schema';

interface CreateUserData {
  email: string;
  password: string;
  full_name: string;
  role: 'admin' | 'internal' | 'external';
  department_id?: string;
  job_title?: string;
  phone?: string;
  location?: string;
  is_active?: boolean;
}

interface UpdateUserData {
  email?: string;
  password?: string;
  full_name?: string;
  role?: 'admin' | 'internal' | 'external';
  department_id?: string;
  job_title?: string;
  phone?: string;
  location?: string;
  is_active?: boolean;
}

interface UsersResponse {
  status: string;
  data: {
    users: User[];
    total: number;
  };
}

interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}

export const userApi = {
  async createUser(data: CreateUserData): Promise<UserResponse> {
    return httpService.post<UserResponse>('/users', data);
  },

  async getAllUsers(filters?: {
    page?: number;
    limit?: number;
    role?: string;
    is_active?: boolean;
  }): Promise<UsersResponse> {
    return httpService.get<UsersResponse>('/users', { params: filters });
  },

  async getUserById(id: string): Promise<UserResponse> {
    return httpService.get<UserResponse>(`/users/${id}`);
  },

  async updateUser(id: string, data: UpdateUserData): Promise<UserResponse> {
    return httpService.patch<UserResponse>(`/users/${id}`, data);
  },

  async deactivateUser(id: string): Promise<void> {
    return httpService.post<void>(`/users/${id}/deactivate`);
  },
};
