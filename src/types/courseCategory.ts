export interface CourseCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  courses_count: number;
}
