import Breadcrumb from "../common/Breadcrumb";
import ContactForm from "./ContactForm";
import GoogleMap from "./GoogleMap";

export default function Contact() {
  return (
    <>
      <Breadcrumb title="Contact Us" subtitle="Contact Us" />
      <ContactForm />
      <GoogleMap />
    </>
  );
}
