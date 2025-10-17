import ExamHeader from "@/components/lesson/ExamHeader";

const ResultLayout = ({ children }: any) => {
  return (
    <div>
      <ExamHeader />
      {children}
    </div>
  );
};
export default ResultLayout;
