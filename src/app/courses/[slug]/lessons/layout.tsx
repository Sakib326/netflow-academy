import LessionSidebar from "@/components/lesson/Sidebar";

type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return (
    <div className="tw:grid tw:lg:grid-cols-[400px_1fr] tw:grid-cols-1">
      <LessionSidebar />
      {children}
    </div>
  );
};
export default LessonLayout;
