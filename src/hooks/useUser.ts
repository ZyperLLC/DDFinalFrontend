import { useState } from 'react';
import * as userApi from '../api/userApi';
import type { User } from '../types';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.registerUser(userData); // must return User object
      setUser(data); // ✅ correct usage
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
  const fetchUser = async (telegramId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getUser(telegramId.toString()); // must return User object
      setUser(data); // ✅ correct usage
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };
  return { register,fetchUser, user, loading, error };
}