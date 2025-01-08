import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'student@example.com',
    password: 'student123',
    role: 'student',
    name: 'Student User'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email: string, password: string) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      set({ user });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => set({ user: null })
}));