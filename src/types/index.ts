export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
