"use client";

import { Discussion } from "@/types/discussion";
import Link from "next/link";
import DiscussionCard from "./components/DiscussionCard";
import { useGetDiscussionsQuery } from "@/redux/discussion/discussionApi";

const Discussions = () => {
  const { data, isFetching } = useGetDiscussionsQuery({
    courseId: 3,
  });

  return (
    <>
      <ul className="tw:flex tw:flex-col tw:gap-6 tw:mb-6">
        {data?.data?.map((discussion: any) => (
          <Link
            key={discussion.id}
            href={`/dashboard/discussions/${discussion.id}`}
          >
            <li className="">
              <DiscussionCard lineclamp={true} thread={discussion} />
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};
export default Discussions;
