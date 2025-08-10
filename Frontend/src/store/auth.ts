import { create } from 'zustand';

// 토큰저장

export type UserProfile = {
  id: number;
  name: string;
  username: string;
  balance: number;
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:4000';

async function api<T>(path: string, opts: RequestInit = {}, token?: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      message = (data as any)?.message || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export type AuthState = {
  token: string | null;
  profile: UserProfile | null;
  login: (username: string, password: string) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('auth_token'),
  profile: null,
  async login(username, password) {
    const data = await api<{ token: string; name: string; username: string }>(
      '/login',
      { method: 'POST', body: JSON.stringify({ username, password }) }
    );
    localStorage.setItem('auth_token', data.token);
    set({ token: data.token });
    await get().fetchMe();
  },
  async fetchMe() {
    const token = get().token;
    if (!token) return;
    const me = await api<UserProfile>('/me', { method: 'GET' }, token);
    set({ profile: me });
  },
  logout() {
    localStorage.removeItem('auth_token');
    set({ token: null, profile: null });
  },
}));

export async function fetchStats() {
  return api<{ totalAmount: number; totalDonors: number }>('/stats');
}

export async function donate(amount: number, token: string) {
  return api<{ donationId: number; status: string }>(
    '/donate',
    { method: 'POST', body: JSON.stringify({ amount }) },
    token
  );
}

export async function settleDonation(donationId: number, status: 'SUCCESS' | 'FAILED', token: string) {
  return api<{ id: number; status: string }>(
    `/donation/${donationId}/settle`,
    { method: 'POST', body: JSON.stringify({ status }) },
    token
  );
}


