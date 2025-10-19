import Certificates from "@/components/dashboard/Certificate";

const CertificatePage = () => {
  return (
    <div className="tw:max-w-4xl tw:mx-auto tw:p-6">
      <h2 className="tw:text-2xl tw:font-bold tw:mb-6">My Certifictes</h2>

      <Certificates />
    </div>
  );
};
export default CertificatePage;
