import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollTop from "../common/ScrollTop";
import ScrollToTop from "../common/ScrollToTop";
import CartArea from "./CartArea";

 

export default function Cart() {
  return (
    <>
    <HeaderOne />
    <Breadcrumb title="Cart" subtitle="Cart" />
    <CartArea />
    <FooterOne />
    <ScrollToTop />
    <ScrollTop />

    </>
  )
}


