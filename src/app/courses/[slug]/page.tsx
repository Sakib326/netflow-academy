// import CourseDetails from "@/components/course-details";
// import { SingleCourse } from "@/types/course";
// import { notFound } from "next/navigation";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ?? "https://admin.netflowacademy.com/api";

// interface CourseDetailsPageProps {
//   params: { slug: string };
// }

// export default async function CourseDetailsPage({
//   params,
// }: CourseDetailsPageProps) {
//   if (!API_URL) notFound();

//   try {
//     const res = await fetch(`${API_URL}/courses/${params.slug}`, {
//       next: { revalidate: 60 },
//     });
//     if (!res.ok) throw new Error(`Status: ${res.status}`);
//     const course: SingleCourse = await res.json();
//     return <CourseDetails course={course} />;
//   } catch {
//     notFound();
//   }
// }

"use client";
import { useEffect, useState } from "react";
import CourseDetails from "@/components/course-details";
import { SingleCourse } from "@/types/course";
import { useParams, notFound } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://admin.netflowacademy.com/api";

export default function CourseDetailsPage() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
      ? params.slug[0]
      : "";
  const [course, setCourse] = useState<SingleCourse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!API_URL || !slug) {
      setError(true);
      return;
    }
    fetch(`${API_URL}/courses/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setCourse(data))
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    notFound();
    return null;
  }

  if (!course) {
    return <div className="tw-p-8 tw-text-center">Loading...</div>;
  }

  return <CourseDetails course={course} />;
}
