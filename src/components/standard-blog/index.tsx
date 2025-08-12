import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollToTop from "../common/ScrollToTop";
import StandardBlogArea from "./StandardBlogArea";


 

export default function StandardBlog() {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Standard Blog" subtitle="Standard Blog" />
      <StandardBlogArea />
      <FooterOne />
      <ScrollToTop />
    </>
  )
}


