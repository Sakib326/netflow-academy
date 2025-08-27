import SingleDiscussion from "@/components/dashboard/Discussions/SingleDiscussion";

type Props = {
  params: {
    discussionId: string | number;
  };
};

const SingleDiscussionPage = async ({ params }: Props) => {
  const { discussionId } = params;
  return (
    <>
      <SingleDiscussion discId={discussionId} />
    </>
  );
};
export default SingleDiscussionPage;
