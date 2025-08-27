"use client";

import React from "react";
import ReplyForm from "./ReplyForm";
import Replies from "./Replies";
import Discussion from "./Discussion";
import { useGetDiscussionQuery } from "@/redux/discussion/discussionApi";

type Props = {
  discId: number | string;
};

const SingleDiscussion = ({ discId }: Props) => {
  const { data: discussion, isFetching } = useGetDiscussionQuery({ discId });

  if (isFetching) {
    return (
      <div className="tw:flex tw:items-center tw:justify-center tw:h-40">
        <div className="tw:w-8 tw:h-8 tw:border-4 tw:border-orange-600 tw:border-t-transparent tw:rounded-full tw:animate-spin"></div>
      </div>
    );
  }

  const { thread, replies } = discussion ?? {};

  return (
    <div className="tw:max-w-3xl tw:mx-auto tw:p-4 tw:space-y-6">
      {/* Main Thread */}
      <Discussion thread={thread} />
      {/* Replies */}
      <Replies replies={replies} />
      {/* Add Comment / Reply */}
      <ReplyForm discId={discId} />
    </div>
  );
};

export default SingleDiscussion;
