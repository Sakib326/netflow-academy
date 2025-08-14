export interface ReviewUser {
  id: number;
  name: string;
  avatar: string | null;
}

export interface ReviewCourse {
  id: number;
  title: string;
  slug: string | null;
  thumbnail: string | null;
}

export interface Review {
  id: number;
  rating: number;
  title: string;
  review: string;
  created_at: string;
  updated_at: string;
  user: ReviewUser;
  course: ReviewCourse;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginatedReviews {
  current_page: number;
  data: Review[];
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
