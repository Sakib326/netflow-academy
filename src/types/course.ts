export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Instructor {
  id: number;
  name: string;
  avatar: string | null;
}

export interface Course {
  id: number;
  title: string;
  slug: string | null;
  description: string | null;
  thumbnail: string | null;
  price: string;
  discounted_price: string | null;
  duration: string | null;
  level: string | null;
  language: string | null;
  status: string;
  total_lessons: number;
  total_students: number;
  average_rating: number;
  total_reviews: number;
  category: Category;
  instructor: Instructor;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginatedCourses {
  current_page: number;
  data: Course[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

export interface Lesson {
  id: number;
  title: string;
  description: string | null;
  duration: string | null;
  lesson_type: string | null;
  order: number;
  is_free: boolean;
  content: string | null;
  video_url: string | null;
}

export interface Module {
  id: number;
  title: string;
  description: string | null;
  order: number;
  lessons: Lesson[];
}

export interface ReviewUser {
  name: string;
  avatar: string | null;
}

export interface RecentReview {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  user: ReviewUser;
}

export interface InstructorDetail extends Instructor {
  email: string;
  bio: string;
  total_courses: number;
  total_students: number;
}

export interface SingleCourse extends Course {
  thumb_video_url?: string | null;
  requirements: string | null;
  what_you_will_learn: string | null;
  rating_distribution: RatingDistribution[];
  instructor: InstructorDetail;
  modules: Module[];
  recent_reviews: RecentReview[];
}
