import { Discussion } from "@/types/discussion";
import Link from "next/link";
import { FaRegCheckSquare, FaRegCommentAlt } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { LuThumbsUp } from "react-icons/lu";

type Props = {
  discussions: Discussion[];
};

const Discussions = ({ discussions }: Props) => {
  return (
    <div>
      <ul className="tw:space-y-6 tw:mb-6">
        {discussions.map((d) => (
          <li
            key={d.id}
            className="tw:border tw:border-gray-200 tw:rounded-2xl tw:p-5 tw:shadow tw:bg-white"
          >
            <div className="tw:flex tw:items-center tw:gap-3 tw:mb-3">
              <img
                src={d.user?.avatar ?? "/default-avatar.png"}
                alt={d.user?.name}
                className="tw:w-12 tw:h-12 tw:rounded-full tw:border tw:border-gray-200"
              />
              <div>
                <p className="tw:font-semibold tw:mb-0">{d.user?.name}</p>
                <p className="tw:text-xs tw:text-gray-500">
                  {new Date(d.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            <h2 className="tw:text-lg tw:font-semibold tw:mb-2">{d.title}</h2>

            <div
              className="tw:prose tw:max-w-none tw:text-gray-700 tw:mb-4 tw:line-clamp-1 "
              dangerouslySetInnerHTML={{ __html: d.content }}
            />

            <div className="tw:flex tw:items-center tw:justify-between tw:text-sm tw:text-gray-500">
              <div className="tw:flex tw:items-center tw:gap-5">
                <span className="tw:flex tw:items-center tw:gap-2 tw:text-base">
                  <LuThumbsUp className="tw:text-xl" /> {d.upvotes}
                </span>
                <span className="tw:flex tw:items-center tw:gap-2 tw:text-base">
                  <FaRegCommentAlt /> {d.replies_count} replies
                </span>
                {d.is_answered && (
                  <span className="tw:text-green-600 tw:font-medium">
                    <FaRegCheckSquare /> Answered
                  </span>
                )}
              </div>
              <Link
                href={`/courses/english-for-workplace/discussions/${d.id}`}
                className="tw:text-orange-600 tw:text-base tw:font-semibold tw:hover:underline tw:flex tw:items-center tw:gap-3"
              >
                View Discussion <HiOutlineArrowNarrowRight />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Discussions;
