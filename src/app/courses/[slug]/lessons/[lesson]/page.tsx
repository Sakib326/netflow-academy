import Lesson from "@/components/lesson";

const LessonPage = ({ params }: any) => {
  console.log("params", params);
  return (
    <>
      <Lesson />
    </>
  );
};
export default LessonPage;
