import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollTop from "../common/ScrollTop";
import ScrollToTop from "../common/ScrollToTop";
import BlogDetailsArea from "./BlogDetailsArea";


 
export default function BlogDetails() {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Blog Details" subtitle="Blog Details" />
      <BlogDetailsArea />
      <FooterOne />
      <ScrollToTop />
      <ScrollTop />
    </>
  )
}


