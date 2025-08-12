import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollToTop from "../common/ScrollToTop";
import InstructorsHomeOne from "../homes/home/InstructorsHomeOne";

 

export default function Instructors() {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Instructors" subtitle="Instructors" />
      <InstructorsHomeOne />
      <InstructorsHomeOne style_2={true} style_3={true} />
      <FooterOne />
      <ScrollToTop />
    </>
  )
}


