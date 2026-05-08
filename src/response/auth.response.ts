export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

// Data bên trong { success: true, data: AuthData }
export interface AuthData {
  token: string;
  user: UserResponse;
}

export type ProfileResponse = UserResponse;
