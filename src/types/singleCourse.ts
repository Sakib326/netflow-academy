export interface SingleCourseCategory {
  id: number;
  name?: string | null;
  slug?: string | null;
}

export interface SingleCourseInstructor {
  id: number;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  bio?: string | null;
  designation?: string | null;
  total_courses?: number | null;
  total_students?: number | null;
}

export interface SingleCourseQuestion {
  question: string;
  option_a?: string | null;
  option_b?: string | null;
  option_c?: string | null;
  option_d?: string | null;
  correct_answer?: string | null; // e.g. "a" | "b" | "c" | "d"
  marks?: number | null;
}

export interface SingleCourseFile {
  name: string;
  type: "url" | "upload";
  url?: string | null; // for external links (YouTube, Google Drive, etc.)
  file?: string | null; // for uploaded files (images, PDFs, etc.)
}

export interface SingleCourseLesson {
  id: number;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  duration?: string | null;
  lesson_type?: string | null;
  questions?: SingleCourseQuestion[] | null;
  files?: SingleCourseFile[] | null;
  order?: number | null;
  is_free?: boolean | null;
  content?: string | null;
}

export interface SingleCourseModule {
  id: number;
  title?: string | null;
  description?: string | null;
  order?: number | null;
  lessons?: SingleCourseLesson[] | null;
}

export interface SingleCourseRatingDistribution {
  rating?: number | null;
  count?: number | null;
  percentage?: number | null;
}

export interface SingleCourse {
  id: number;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  thumb_video_url?: string | null;
  price?: string | null;
  discounted_price?: string | null;
  status?: string | null;
  total_lessons?: number | null;
  total_students?: number | null;
  average_rating?: number | null;
  total_reviews?: number | null;
  rating_distribution?: SingleCourseRatingDistribution[] | null;
  category?: SingleCourseCategory | null;
  instructor?: SingleCourseInstructor | null;

  modules?: SingleCourseModule[] | null;
  recent_reviews?: any[] | null; // Can refine if review type known
  created_at?: string | null;
  updated_at?: string | null;
}
