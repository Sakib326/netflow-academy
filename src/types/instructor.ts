export interface Instructor {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  role: string;
  total_courses: number;
  total_students: number;
  created_at: string;
}
