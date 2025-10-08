import LessionSidebar from "@/components/lesson/Sidebar";

type Props = {
  children: React.ReactNode;
};

const LessonLayout = ({ children }: Props) => {
  return (
    <div className="tw:grid tw:grid-cols-[400px_1fr]">
      <LessionSidebar />
      {children}
    </div>
  );
};
export default LessonLayout;
