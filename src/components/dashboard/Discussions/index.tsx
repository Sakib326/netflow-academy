"use client";

import Link from "next/link";
import DiscussionCard from "./components/DiscussionCard";
import { useLazyGetDiscussionsQuery } from "@/redux/discussion/discussionApi";
import { useEffect, useRef, useState } from "react";

const Discussions = () => {
  const [page, setPage] = useState(1);
  const [allDiscussions, setAllDiscussions] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [trigger, { data, isFetching }] = useLazyGetDiscussionsQuery();

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // fetch when page changes
  useEffect(() => {
    trigger({ courseId: 3, page }).then((res: any) => {
      if (res?.data?.data) {
        setAllDiscussions((prev) => [...prev, ...res.data.data]);
        setHasMore(res.data.current_page < res.data.last_page);
      }
    });
  }, [page, trigger]);

  // infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current || !hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, isFetching]);
  console.log("data", data);
  return (
    <>
      <ul className="tw:flex tw:flex-col tw:gap-6 tw:mb-6">
        {allDiscussions.map((discussion) => (
          <Link
            key={discussion.id}
            href={`/dashboard/discussions/${discussion.id}`}
          >
            <li>
              <DiscussionCard lineclamp={true} thread={discussion} />
            </li>
          </Link>
        ))}
      </ul>

      <div className="tw-text-center tw-py-4 tw-text-gray-500">
        {isFetching && hasMore && (
          <h6 className="tw:text-center tw:py-4">Loading...</h6>
        )}
        {!hasMore && (
          <h6 className="tw:text-center tw:py-4">
            You have seen all discussions.
          </h6>
        )}
      </div>

      {/* Hidden div to trigger infinite scroll */}
      {hasMore && <div ref={loaderRef} />}
    </>
  );
};
export default Discussions;
