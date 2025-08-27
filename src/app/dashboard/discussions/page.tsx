import Discussions from "@/components/dashboard/Discussions";
import DiscussionForm from "@/components/dashboard/Discussions/components/DiscussionForm";

type Props = {
  params: {
    slug: string;
  };
  searchParams?: { page?: string };
};

const DiscussionsPage = async ({ params, searchParams }: Props) => {
  return (
    <div className="tw:max-w-3xl tw:mx-auto tw:p-4">
      <div>
        <DiscussionForm courseId={3} />
      </div>
      <Discussions />
    </div>
  );
};
export default DiscussionsPage;
