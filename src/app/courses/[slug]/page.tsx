import CourseDetails from "@/components/course-details";
import { Metadata } from "next";
import { SingleCourse } from "@/types/course";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CourseDetailsPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: CourseDetailsPageProps): Promise<Metadata> {
  const res = await fetch(`${API_URL}/courses/${params.slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return {
      title: "Course Not Found | Netflow Academy",
      description: "This course does not exist.",
    };
  }
  const course: SingleCourse = await res.json();
  return {
    title: `${course.title} | Netflow Academy`,
    description: course.description || "Course details and curriculum.",
    keywords: [course.title, course.category.name, "Netflow Academy", "Course"],
  };
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  console.log("API_URL:", API_URL); // Add this debug log
  console.log("Full URL:", `${API_URL}/courses/${params.slug}`);

  // Add null check
  if (!API_URL) {
    console.error("API_URL is not defined");
    notFound();
  }

  const res = await fetch(`${API_URL}/courses/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("Fetch failed:", res.status, res.statusText);
    notFound();
  }

  const course: SingleCourse = await res.json();
  return <CourseDetails course={course} />;
}
