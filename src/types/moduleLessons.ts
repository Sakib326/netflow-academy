// types.ts

export interface Course {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  modules: Module[];
  enrolled: boolean;
}

export interface Module {
  id: number;
  title: string;
  description?: string | null;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  duration?: string | null;
  lesson_type: string;
  order: number;
  is_free: boolean;
  content?: string | null;
  questions?: Question[] | null;
  files?: FileItem[] | null;
}

export interface Question {
  id: number;
  question?: string | null;
  option_a?: string | null;
  option_b?: string | null;
  option_c?: string | null;
  option_d?: string | null;
  correct_answer?: string | null;
  marks?: number | null;
}

export interface FileItem {
  id?: number;
  name?: string | null;
  url?: string | null;
  type?: string | null;
}

export interface Submission {
  id: number;
  user_id: number;
  lesson_id: number;
  type: string;
  content?: string | Record<string, any> | null;
  files?: string[] | null;
  status: string;
  submitted_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  modules?: Module[];
  lesson?: Lesson;
  submissions?: Submission[];
  enrolled?: boolean;
  message?: string;
}
