import Instructors from "@/components/instructors";
import { Instructor } from "@/types/instructor";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function InstructorsPage() {
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

  const [instructors] = await Promise.all([fetchInstructors()]);
  return <Instructors instructors={instructors} />;
}
