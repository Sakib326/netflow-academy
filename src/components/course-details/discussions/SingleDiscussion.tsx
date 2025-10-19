"use client";

import type { SingleDiscussion } from "@/types/discussion";
import React from "react";
import { LuDot } from "react-icons/lu";
import moment from "moment";
import DiscussionCard from "@/components/dashboard/Discussions/components/DiscussionCard";

type Props = {
  discussion?: SingleDiscussion;
};

const SingleDiscussion = ({ discussion }: Props) => {
  if (!discussion) return <div>No discussion found.</div>;

  const { thread, replies } = discussion;

  return (
    <div className="tw:max-w-3xl tw:mx-auto tw:p-4 tw:space-y-6">
      {/* Main Thread */}
      <DiscussionCard thread={thread} />

      {/* Replies */}
      <div className="tw:space-y-4">
        {replies.length === 0 ? (
          <p className="tw:text-gray-500">No replies yet.</p>
        ) : (
          replies.map((reply) => (
            <div
              key={reply.id}
              className="tw:border tw:border-gray-200 tw:rounded-lg tw:p-3 tw:bg-gray-50"
            >
              <div className="tw:flex tw:items-center tw:space-x-3">
                <img
                  src={reply.user.avatar}
                  alt={reply.user.name}
                  className="tw:w-8 tw:h-8 tw:rounded-full tw:border tw:border-gray-200"
                />

                <h4 className="tw:m-0 tw:text-sm tw:flex tw:font-normal tw:items-center tw:gap-[2px]">
                  {reply.user.name} <LuDot className="tw:text-sm" />
                  {moment(reply.created_at).fromNow()}
                </h4>
              </div>
              <div
                className="tw:mt-4 tw:ml-6 tw:text-gray-700"
                dangerouslySetInnerHTML={{ __html: reply.content }}
              ></div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment / Reply */}
      <div className="tw:mt-4 tw:border-t tw:border-gray-200 tw:pt-4">
        <textarea
          placeholder="Write a reply..."
          className="tw:w-full tw:focus:outline-gray-300 tw:border tw:border-gray-200 tw:rounded-md tw:p-2 tw:resize-none focus:tw:outline-none focus:tw:ring focus:tw:ring-blue-400"
          rows={2}
        />
        <button className="tw:mt-2 tw:bg-orange-600 tw:text-white tw:font-medium tw:px-8 tw:py-1 tw:rounded tw:hover:bg-orange-500">
          Reply
        </button>
      </div>
    </div>
  );
};

export default SingleDiscussion;
