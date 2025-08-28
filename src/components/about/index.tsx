import Breadcrumb from "../common/Breadcrumb";
import AboutHome from "../home/AboutHome";
import BrandHome from "../home/BrandHome";
import CounterHome from "../home/CounterHome";
import FeatureHome from "../home/FeatureHome";
import VideoHome from "../home/VideoHome";

export default function About() {
  return (
    <>
      <Breadcrumb title="About Us" subtitle="About Us" />
      <FeatureHome />
      <AboutHome />
      <CounterHome />
      <VideoHome />
      <BrandHome />
    </>
  );
}
