import { Instructor } from "@/types/instructor";
import Breadcrumb from "../common/Breadcrumb";
import InstructorsHome from "../home/InstructorsHome";

type Props = {
  instructors: Instructor[];
};

export default function Instructors({ instructors }: Props) {
  return (
    <>
      <Breadcrumb title="Instructors" subtitle="Instructors" />
      <InstructorsHome instructors={instructors} />
    </>
  );
}
