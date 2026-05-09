export interface UserResponse {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'student';
  status: 'pending_approval' | 'pending_email_verification' | 'active' | 'rejected';
  auth_provider: 'local' | 'google';
  avatar_url?: string;
  created_at: string;
}

// Data bên trong { success: true, data: AuthData }
export interface AuthData {
  token?: string; // Token có thể undefined nếu đang chờ duyệt (Google register)
  user: UserResponse;
}

export type ProfileResponse = UserResponse;
