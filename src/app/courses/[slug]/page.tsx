import CourseDetails from "@/components/course-details";
import { Metadata } from "next";
import { SingleCourse } from "@/types/course";
import { notFound } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://admin.netflowacademy.com/api";

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
  if (!API_URL) notFound();

  try {
    const res = await fetch(`${API_URL}/courses/${params.slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const course: SingleCourse = await res.json();
    return <CourseDetails course={course} />;
  } catch {
    notFound();
  }
}
