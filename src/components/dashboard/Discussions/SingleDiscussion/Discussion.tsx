"use client";

import { Thread } from "@/types/discussion";
import moment from "moment";
import {
  FaCheckSquare,
  FaQuestion,
  FaRegCheckSquare,
  FaRegCommentAlt,
} from "react-icons/fa";
import UpVotes from "./UpVotes";
import { BsHourglassSplit } from "react-icons/bs";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useMarkAnsweredMutation } from "@/redux/discussion/discussionApi";

type Props = {
  thread?: Thread;
};

const Discussion = ({ thread }: Props) => {
  const [markAnswered] = useMarkAnsweredMutation();
  const user = useSelector((state: RootState) => state.auth.user);

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
        <h3 className="tw:font-bold tw:text-xl tw:mt-3">{thread?.title}</h3>
        <div
          className={` tw:mt-4 tw:min-h-10 tw:text-slate-400 tw:pl-2`}
          dangerouslySetInnerHTML={{ __html: thread?.content ?? "" }}
        ></div>
      </div>
      <div className="tw:mt-3 tw:px-4 tw:py-2 tw:flex tw:items-center tw:justify-between tw:text-base tw:text-gray-500 tw:border-t tw:border-gray-200">
        <div className="tw:flex tw:items-center tw:gap-3">
          <span className="tw:flex tw:items-center tw:space-x-1">
            {thread?.is_question ? <FaQuestion /> : <FaRegCommentAlt />}
            <span>{thread?.is_question ? "Question" : "Discussion"}</span>
          </span>
          {/* <UpVotes thread={thread} /> */}
        </div>

        <div className="tw:flex tw:items-center tw:gap-3">
          {thread?.user.id === user?.id &&
            thread?.is_question &&
            !thread?.is_answered && (
              <span className="tw:flex tw:items-center tw:space-x-1">
                <BsHourglassSplit className="tw:text-yellow-600" />
                <span>Not answered</span>
              </span>
            )}

          {thread?.user.id === user?.id && thread?.is_question && (
            <button
              onClick={() => markAnswered({ discId: thread.id })}
              className="tw:flex tw:items-center tw:space-x-1 tw-text-blue-600 hover:tw:underline"
            >
              {thread?.is_answered ? (
                <FaCheckSquare className="tw:text-green-500" />
              ) : (
                <FaRegCheckSquare className="tw:text-yellow-600" />
              )}
              <span>
                {thread?.is_answered ? "Answered" : "Mark as answered"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Discussion;
