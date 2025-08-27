"use client";

import { useCreateUpvoteMutation } from "@/redux/discussion/discussionApi";
import { Thread } from "@/types/discussion";
import { BiUpvote } from "react-icons/bi";

type Props = {
  thread?: Thread;
};

const UpVotes = ({ thread }: Props) => {
  const [createUpvote] = useCreateUpvoteMutation();

  return (
    <button
      onClick={() => createUpvote({ discId: thread?.id })}
      className="tw:flex tw:items-center tw:space-x-1"
    >
      <BiUpvote className="tw:text-xl" />
      <span>{thread?.upvotes}</span>
    </button>
  );
};
export default UpVotes;
