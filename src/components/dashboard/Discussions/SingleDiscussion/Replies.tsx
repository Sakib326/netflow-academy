import { Reply } from "@/types/discussion";
import moment from "moment";
import { LuDot } from "react-icons/lu";

type Props = {
  replies?: Reply[];
};

const Replies = ({ replies }: Props) => {
  return (
    <div className="tw:space-y-4">
      {replies?.length === 0 ? (
        <p className="tw:text-gray-500">No replies yet.</p>
      ) : (
        replies?.map((reply) => (
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
  );
};
export default Replies;
