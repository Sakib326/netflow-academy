import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollTop from "../common/ScrollTop";
import ScrollToTop from "../common/ScrollToTop";
import CheckoutArea from "./CheckoutArea";

 

export default function Checkout() {
  return (
    <>
      <HeaderOne />
      <Breadcrumb title="Checkout" subtitle="Checkout" />
      <CheckoutArea />
      <FooterOne />
      <ScrollToTop />
      <ScrollTop />
    </>
  )
}


