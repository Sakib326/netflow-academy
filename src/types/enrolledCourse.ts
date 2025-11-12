export interface EnrolledCourseListResponse {
  current_page: number;
  data: EnrolledCourse[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface EnrolledCourse {
  enrollment_id: number;
  enrollment_date: string;
  enrollment_status: string;
  progress_percentage: number;
  completed_lessons: number;
  total_lessons: number;
  batch: Batch;
  course: Course;
  next_class_time: string | null;
}

export interface ClassDay {
  day: string;
  start_time: string;
  end_time: string;
}

export interface OffDate {
  date: string;
  note: string | null;
}

export interface ClassRoutine {
  id: number;
  days: ClassDay[];
  off_dates: OffDate[];
  is_class_today: boolean;
  is_off_today: boolean;
  today_class_time: string | null;
}

export interface Batch {
  id: number;
  name: string;
  zoom_link: string | null;
  start_date: string;
  end_date: string | null;
  status: string;
  max_students: number | null;
  current_students: number | null;
  schedule: string | null;
  timezone: string | null;
  days_until_start: number | null;
  days_until_end: number | null;
  class_routine?: ClassRoutine;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  thumbnail: string;
  duration: string | null;
  level: string | null;
  language: string | null;
  status: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  instructor: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    designation: string;
  };
}
export interface EnrolledCourseStatusCount {
  active: number;
  completed: number;
  dropped: number;
  suspended: number;
  pending: number;
}
