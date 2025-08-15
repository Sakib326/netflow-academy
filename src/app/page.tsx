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

export default async function HomePage() {
  async function fetchCourses(
    params: FetchCoursesParams = {}
  ): Promise<PaginatedCourses> {
    const url = new URL(`${API_URL}/courses`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }
    return res.json();
  }

  async function fetchCategories(): Promise<CourseCategory[]> {
    const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    return res.json();
  }

  async function fetchInstructors(): Promise<Instructor[]> {
    const res = await fetch(`${API_URL}/instructors`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch instructors");
    }
    return res.json();
  }

  interface FetchReviewsParams {
    page?: number;
    per_page?: number;
    course_id?: number;
    rating?: number;
  }

  async function fetchReviews(
    params: FetchReviewsParams = {}
  ): Promise<PaginatedReviews> {
    const url = new URL(`${API_URL}/reviews`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }
    return res.json();
  }
  const [courses, categories, instructors, reviews] = await Promise.all([
    fetchCourses({ page: 1, per_page: 10, sort: "latest" }),
    fetchCategories(),
    fetchInstructors(),
    fetchReviews({ page: 1, per_page: 10 }),
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
