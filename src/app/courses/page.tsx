import Courses from "@/components/courses";
import { Metadata } from "next";
import { PaginatedCourses } from "@/types/course";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: "Courses | Netflow Academy",
  description: "Browse all courses offered by Netflow Academy.",
  keywords: ["Netflow", "Academy", "Courses", "Learning"],
};

interface FetchCoursesParams {
  page?: number;
  per_page?: number;
  category_id?: number;
  search?: string;
  sort?: "latest" | "popular" | "price_low" | "price_high";
}

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

export default async function CoursesPage() {
  const courses = await fetchCourses({ page: 1, per_page: 20, sort: "latest" });

  return <Courses {...courses} />;
}
