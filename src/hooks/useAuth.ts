'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/auth.service';
import type { LoginPayload, RegisterPayload } from '@/payload/auth.payload';
import type { UserResponse } from '@/response/auth.response';

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------- LOGIN ----------
  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await AuthService.login(payload);
      // data = { success: true, data: { token, user } }
      const { token, user } = data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/home');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Đăng nhập thất bại. Vui lòng thử lại.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- REGISTER ----------
  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await AuthService.register(payload);
      // data = { success: true, data: { token, user } }
      const { token, user } = data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/home');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Đăng ký thất bại. Vui lòng thử lại.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- LOGOUT ----------
  const logout = () => {
    AuthService.logout();
    router.push('/login');
  };

  // ---------- GET CURRENT USER (từ localStorage) ----------
  const getCurrentUser = (): UserResponse | null => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as UserResponse) : null;
  };

  return {
    loading,
    error,
    login,
    register,
    logout,
    getCurrentUser,
    clearError: () => setError(null),
  };
}
