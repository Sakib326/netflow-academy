export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  role: string;
  avatar: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
