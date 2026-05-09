import axiosInstance from '@/config/axios';
import type { LoginPayload, RegisterPayload } from '@/payload/auth.payload';
import type { AuthData, ProfileResponse } from '@/response/auth.response';
import type { ApiResponse } from '@/response/api.response';

const AuthService = {
  // POST /auth/login → { success: true, data: { token, user } }
  login: (payload: LoginPayload) =>
    axiosInstance.post<ApiResponse<AuthData>>('/auth/login', payload),

  // POST /auth/google → { success: true, data: { token, user } }
  googleLogin: (id_token: string) =>
    axiosInstance.post<ApiResponse<AuthData>>('/auth/google', { id_token }),

  // POST /auth/register → { success: true, data: { token, user } }
  register: (payload: RegisterPayload) =>
    axiosInstance.post<ApiResponse<AuthData>>('/auth/register', payload),

  // GET /auth/me → { success: true, data: { id, email, ... } }
  getMyProfile: () =>
    axiosInstance.get<ApiResponse<ProfileResponse>>('/auth/me'),

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export default AuthService;
