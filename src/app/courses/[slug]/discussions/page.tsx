import Discussions from "@/components/course-details/discussions";
import DiscussionForm from "@/components/course-details/discussions/components/DiscussionForm";
import Pagination from "@/components/course-details/discussions/components/Pagination";
import { Course } from "@/types/course";
import { Discussion, PaginatedResponse } from "@/types/discussion";
import { fetchData } from "@/utils/fetchData";

type Props = {
  params: {
    slug: string;
  };
  searchParams?: { page?: string };
};

const DiscussionsPage = async ({ params, searchParams }: Props) => {
  const page = searchParams?.page ?? "1";

  // 1. Fetch course by slug
  const course = await fetchData<Course>(`/courses/${params.slug}`);
  const courseId = course.id;

  // 2. Fetch discussions (paginated)
  const res = await fetchData<PaginatedResponse<Discussion>>(
    `/courses/${courseId}/discussions?page=${page}`
  );

  console.log("res", res);

  return (
    <div className="tw:max-w-3xl tw:mx-auto tw:py-10 tw:px-4">
      <h1 className="tw:text-2xl tw:font-bold tw:mb-6 tw:text-center">
        Discussions for {course.title}
      </h1>

      {/* <div>
        <DiscussionForm coursId={courseId} />
      </div> */}

      {res.data.length === 0 ? (
        <p className="tw:text-gray-500">No discussions yet.</p>
      ) : (
        <Discussions discussions={res.data} />
      )}

      {/* Pagination */}
      {res.total > res.per_page && <Pagination res={res} />}
    </div>
  );
};
export default DiscussionsPage;
