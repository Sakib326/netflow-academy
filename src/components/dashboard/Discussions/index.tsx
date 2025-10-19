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

  // keep latest isFetching in a ref so observer callback sees current value
  const isFetchingRef = useRef<boolean>(false);
  useEffect(() => {
    isFetchingRef.current = !!isFetching;
  }, [isFetching]);

  // fetch when page changes
  useEffect(() => {
    let mounted = true;

    trigger({ courseId: 3, page })
      .then((res: any) => {
        if (!mounted) return;
        const payload = res?.data;
        if (payload?.data && Array.isArray(payload.data)) {
          // avoid duplicates
          setAllDiscussions((prev) => {
            const newItems = payload.data.filter(
              (d: any) => !prev.some((p) => p.id === d.id)
            );
            return [...prev, ...newItems];
          });

          const current = payload.current_page ?? page;
          const last = payload.last_page ?? current;
          setHasMore(current < last);
        } else {
          // no data -> stop further loads
          setHasMore(false);
        }
      })
      .catch(() => {
        if (mounted) setHasMore(false);
      });

    return () => {
      mounted = false;
    };
  }, [page, trigger]);

  // infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "0px 0px 200px 0px", threshold: 0 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
      observer.disconnect();
    };
  }, [hasMore]);

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

      <div className="tw:text-center tw:py-4 tw:text-gray-500">
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
      {hasMore && <div ref={loaderRef} style={{ minHeight: 1 }} />}
    </>
  );
};
export default Discussions;
