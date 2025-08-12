import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breadcrumb from "../common/Breadcrumb";
import ScrollTop from "../common/ScrollTop";
import ScrollToTop from "../common/ScrollToTop";
import LoginForm from "./LoginForm";

 

export default function Login() {
  return (
    <>
    <HeaderOne />
    <Breadcrumb title="Login" subtitle="Login" />
    <LoginForm />
    <FooterOne />
    <ScrollToTop />
    <ScrollTop />

    </>
  )
}


