import { RootState } from "@/redux/store";
import { Discussion, Thread } from "@/types/discussion";
import { BsHourglassSplit } from "react-icons/bs";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { useSelector } from "react-redux";

type Props = {
  thread?: Thread;
};

const MarkAnswered = ({ thread }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="tw:flex tw:items-center tw:gap-3">
      {user?.role !== "student" &&
        thread?.is_question &&
        !thread?.is_answered && (
          <span className="tw:flex tw:items-center tw:space-x-1">
            <BsHourglassSplit className="tw:text-yellow-600" />
            <span>Not answered</span>
          </span>
        )}

      {user?.role !== "student" && thread?.is_question && (
        <button className="tw:flex tw:items-center tw:space-x-1 tw:text-blue-600 tw:hover:underline">
          {thread?.is_answered ? (
            <FaCheckSquare className="tw:text-green-500" />
          ) : (
            <FaRegCheckSquare className="tw:text-yellow-600" />
          )}
          <span>{thread?.is_answered ? "Answered" : "Mark as answered"}</span>
        </button>
      )}
    </div>
  );
};
export default MarkAnswered;
