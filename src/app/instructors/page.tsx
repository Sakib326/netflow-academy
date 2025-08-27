import Instructors from "@/components/instructors";
import { Instructor } from "@/types/instructor";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function InstructorsPage() {
  async function fetchInstructors(): Promise<Instructor[]> {
    const res = await fetch(`${API_URL}/instructors`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch instructors");
    }
    return res.json();
  }

  const [instructors] = await Promise.all([fetchInstructors()]);
  return <Instructors instructors={instructors} />;
}
