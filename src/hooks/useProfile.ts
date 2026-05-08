'use client';

import { useState, useEffect, useRef } from 'react';
import AuthService from '@/services/auth.service';
import type { ProfileResponse } from '@/response/auth.response';

export function useProfile() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false); // Chống gọi API 2 lần (StrictMode)

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await AuthService.getMyProfile();
        // data = { success: true, data: { id, email, ... } }
        setProfile(data.data);
      } catch {
        setError('Không thể tải thông tin profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
}
