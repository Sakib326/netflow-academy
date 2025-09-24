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
