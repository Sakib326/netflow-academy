import Home from "@/components/home";
import { Metadata } from "next";
import { PaginatedCourses } from "@/types/course";
import { CourseCategory } from "@/types/courseCategory";
import { Instructor } from "@/types/instructor";
import { PaginatedReviews } from "@/types/review";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchCoursesParams {
  page?: number;
  per_page?: number;
  category_id?: number;
  search?: string;
  sort?: "latest" | "popular" | "price_low" | "price_high";
}

export const metadata: Metadata = {
  title: "Netflow Academy - Home",
  description:
    "Welcome to Netflow Academy. Your trusted partner for networking solutions.",
  keywords: ["Netflow", "Academy", "Networking", "Solutions"],
};

const emptyPaginatedCourses: PaginatedCourses = {
  current_page: 1,
  data: [],
  first_page_url: "",
  from: 0,
  last_page: 1,
  last_page_url: "",
  links: [],
  next_page_url: null,
  path: "",
  per_page: 10,
  prev_page_url: null,
  to: 0,
  total: 0,
};

const emptyPaginatedReviews: PaginatedReviews = {
  current_page: 1,
  data: [],
  first_page_url: "",
  from: 0,
  last_page: 1,
  last_page_url: "",
  links: [],
  next_page_url: null,
  path: "",
  per_page: 10,
  prev_page_url: null,
  to: 0,
  total: 0,
};

export default async function HomePage() {
  async function fetchCourses(
    params: FetchCoursesParams = {},
  ): Promise<PaginatedCourses> {
    try {
      if (!API_URL) return emptyPaginatedCourses;
      const url = new URL(`${API_URL}/courses`);
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });

      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) {
        console.error(`Failed to fetch courses: ${res.status} ${res.statusText}`);
        return emptyPaginatedCourses;
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching courses:", error);
      return emptyPaginatedCourses;
    }
  }

  async function fetchCategories(): Promise<CourseCategory[]> {
    try {
      if (!API_URL) return [];
      const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
      if (!res.ok) {
        console.error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
        return [];
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  async function fetchInstructors(): Promise<Instructor[]> {
    try {
      if (!API_URL) return [];
      const res = await fetch(`${API_URL}/instructors`, { cache: "no-store" });
      if (!res.ok) {
        console.error(`Failed to fetch instructors: ${res.status} ${res.statusText}`);
        return [];
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching instructors:", error);
      return [];
    }
  }

  interface FetchReviewsParams {
    page?: number;
    per_page?: number;
    course_id?: number;
    rating?: number;
  }

  async function fetchReviews(
    params: FetchReviewsParams = {},
  ): Promise<PaginatedReviews> {
    try {
      if (!API_URL) return emptyPaginatedReviews;
      const url = new URL(`${API_URL}/reviews`);
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });

      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) {
        console.error(`Failed to fetch reviews: ${res.status} ${res.statusText}`);
        return emptyPaginatedReviews;
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return emptyPaginatedReviews;
    }
  }

  const [courses, categories, instructors, reviews] = await Promise.all([
    fetchCourses({ page: 1, per_page: 10, sort: "latest" }),
    fetchCategories(),
    fetchInstructors(),
    fetchReviews({ page: 1, per_page: 100 }),
  ]);

  return (
    <Home
      courses={courses.data ?? []}
      categories={categories ?? []}
      instructors={instructors ?? []}
      reviews={reviews.data ?? []}
    />
  );
}
