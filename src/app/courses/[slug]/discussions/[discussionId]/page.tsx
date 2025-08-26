import SingleDiscussion from "@/components/course-details/discussions/SingleDiscussion";
import type { SingleDiscussion as SingleDiscussionType } from "@/types/discussion";
import { fetchData } from "@/utils/fetchData";

type Props = {
  params: {
    discussionId: string | number;
  };
};

const SingleDiscussionPage = async ({ params }: Props) => {
  const data = await fetchData<SingleDiscussionType>(
    `/discussions/${params?.discussionId}`
  );

  return (
    <div>
      <SingleDiscussion discussion={data} />
    </div>
  );
};
export default SingleDiscussionPage;
