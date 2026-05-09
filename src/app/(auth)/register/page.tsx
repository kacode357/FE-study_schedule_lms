'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, BookOpen, Loader2, AlertCircle, UserRound } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import type { RegisterPayload } from '@/payload/auth.payload';

interface RegisterForm extends RegisterPayload {
  confirmPassword: string;
}

export default function RegisterPage() {
  const { register, loading, error, clearError } = useAuth();
  const [form, setForm] = useState<RegisterForm>({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setValidationError('');
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setValidationError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (form.password.length < 6) {
      setValidationError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    await register({
      full_name: form.full_name,
      email: form.email,
      password: form.password,
    });
  };

  const displayError = validationError || error;

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse [animation-delay:2s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet-600/10 blur-[80px] animate-pulse [animation-delay:4s]" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 shadow-2xl shadow-black/50">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-100 to-indigo-300 bg-clip-text text-transparent">
            iStudy LMS
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-100 mb-1">Tạo tài khoản mới</h1>
        <p className="text-sm text-slate-400 mb-8">Bắt đầu hành trình học tập cùng iStudy</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-sm font-medium text-slate-400">
              Họ và tên
            </label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
              <input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Nguyễn Văn A"
                value={form.full_name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-400">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Tối thiểu 6 ký tự"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 pr-12 bg-white/[0.05] border border-white/[0.08] rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-400">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 pr-12 bg-white/[0.05] border border-white/[0.08] rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {displayError && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {displayError}
            </div>
          )}

          {/* Submit */}
          <button
            id="register-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang tạo tài khoản...
              </>
            ) : (
              'Tạo tài khoản →'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-cyan-400 font-medium transition-colors">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
