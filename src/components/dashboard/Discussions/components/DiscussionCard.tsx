import moment from "moment";
import { Discussion, Thread } from "@/types/discussion";
import { FaQuestion, FaRegCommentAlt } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import MarkAnswered from "./MarkAnswered";

type Props = {
  thread?: Thread;
  lineclamp?: boolean;
};

const DiscussionCard = ({ thread, lineclamp = false }: Props) => {
  return (
    <div className="tw:border tw:border-gray-200 tw:rounded-lg tw:bg-white">
      <div className="tw:flex tw:items-center tw:gap-2 tw:mb-3 tw:px-4 tw:pt-4">
        <img
          src={thread?.user?.avatar ?? "/default-avatar.png"}
          alt={thread?.user?.name}
          className="tw:w-12 tw:h-12 tw:rounded-full tw:object-cover tw:border tw:border-gray-200"
        />
        <div className="tw:flex tw:flex-col tw:justify-items-center">
          <p className="tw:font-semibold tw:text-sm  tw:m-0">
            {thread?.user?.name}
          </p>
          <p className="tw:text-xs tw:text-gray-500 tw:m-0">
            {moment(thread?.created_at).fromNow()}
          </p>
        </div>
      </div>
      <div className=" tw:px-4">
        <h3 className="tw:font-bold tw:text-base tw:md:text-xl tw:mt-3 tw:line-clamp-1">
          {thread?.title}
        </h3>
        <div
          className={`tw:line-clamp-2 tw:text-sm tw:md:text-base tw:mt-4 tw:min-h-10 tw:text-slate-400 tw:pl-2`}
          dangerouslySetInnerHTML={{ __html: thread?.content ?? "" }}
        ></div>
      </div>
      <div className="tw:mt-3 tw:px-4 tw:py-2 tw:flex tw:items-center tw:justify-between tw:space-x-5 tw:text-base tw:text-gray-500 tw:border-t tw:border-gray-200">
        <div className="tw:flex tw:items-center tw:gap-3">
          <span className="tw:flex tw:items-center tw:space-x-1">
            {thread?.is_question ? <FaQuestion /> : <FaRegCommentAlt />}
            <span>{thread?.is_question ? "Question" : "Discussion"}</span>
          </span>

          {/* <span className="tw:flex tw:items-center tw:space-x-1">
            <BiUpvote className="tw:text-xl" />
            <span>{thread?.upvotes}</span>
          </span> */}
        </div>

        <MarkAnswered thread={thread} />
      </div>
    </div>
  );
};
export default DiscussionCard;
