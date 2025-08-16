import FooterOne from "../../../layouts/Footer";
import HeaderTwo from "../../../layouts/Header/HeaderTwo";
import ScrollToTop from "../../common/ScrollToTop";
import ScrollTop from "../../common/ScrollTop";
import AboutHomeOne from "../../home/AboutHome";
import CounterHomeOne from "../../home/CounterHome";
import WorkingProcessHomeOne from "../../home/WorkingProcessHome";
import BrandHomeTwo from "./BrandHomeTwo";
import CoursesHomeTwo from "./CoursesHomeTwo";
import CtaHomeTwo from "./CtaHomeTwo";
import FaqHomeTwo from "./FaqHomeTwo";
import HeroHomeTwo from "./HeroHomeTwo";

export default function HomeTwo() {
  return (
    <>
      <HeaderTwo />
      <HeroHomeTwo />
      <BrandHomeTwo />
      {/* <FeatureHomeOne style_2={true} /> */}
      <AboutHomeOne />
      <CounterHomeOne />
      <CoursesHomeTwo />
      {/* <CourseCategoryHomeOne /> */}
      <WorkingProcessHomeOne />
      {/* <InstructorsHomeOne /> */}
      <FaqHomeTwo />
      {/* <ReviewHomeOne /> */}
      <CtaHomeTwo />
      <FooterOne />
      <ScrollToTop />
      <ScrollTop />
    </>
  );
}
