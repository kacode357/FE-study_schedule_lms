'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, LogOut, User, Mail, Shield, Calendar, Loader2 } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const router = useRouter();
  const { profile, loading, error } = useProfile();
  const { logout } = useAuth();

  // Nếu chưa có token → redirect về login
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      router.replace('/login');
    }
  }, [router]);

  const roleLabel: Record<string, string> = {
    STUDENT: 'Sinh viên',
    TEACHER: 'Giảng viên',
    ADMIN: 'Quản trị viên',
  };

  const roleColor: Record<string, string> = {
    STUDENT: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    TEACHER: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    ADMIN: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-100">iStudy LMS</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 border border-white/[0.06] hover:border-red-400/30 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-slate-500 text-sm">Đang tải thông tin...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-32">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Profile loaded */}
        {profile && !loading && (
          <div className="space-y-8">
            {/* Greeting */}
            <div>
              <h1 className="text-3xl font-bold text-slate-100">
                Xin chào, <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">{profile.fullName}</span> 👋
              </h1>
              <p className="text-slate-500 mt-2">Chào mừng bạn trở lại với iStudy LMS</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 max-w-lg">
              <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" />
                Thông tin cá nhân
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Họ và tên</p>
                    <p className="text-slate-100 font-medium">{profile.fullName}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Email</p>
                    <p className="text-slate-100 font-medium">{profile.email}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Vai trò</p>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${roleColor[profile.role] || 'text-slate-400 bg-slate-400/10 border-slate-400/20'}`}>
                      {roleLabel[profile.role] || profile.role}
                    </span>
                  </div>
                </div>

                {/* Joined */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Ngày tham gia</p>
                    <p className="text-slate-100 font-medium">
                      {new Date(profile.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit', month: '2-digit', year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
