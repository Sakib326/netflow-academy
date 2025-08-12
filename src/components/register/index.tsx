import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollTop from "../common/ScrollTop";
import ScrollToTop from "../common/ScrollToTop";
import RegisterForm from "./RegisterForm";

 
export default function Register() {
  return (
    <>
    <HeaderOne />
    <Breadcrumb title="Register" subtitle="Register" />
    <RegisterForm />
    <FooterOne />
    <ScrollToTop />
    <ScrollTop />

    </>
  )
}


