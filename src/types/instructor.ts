export interface Instructor {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  role: string;
  total_courses: number;
  total_students: number;
  designation?: string;
  social_links: {
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
  };
  created_at: string;
}
