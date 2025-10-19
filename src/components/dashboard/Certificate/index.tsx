"use client";

import { useGetMyCertificatesQuery } from "@/redux/certificate/certificateApi";
import { FaDownload } from "react-icons/fa";

const MyCertificates = () => {
  const page = 1;
  const limit = 50;

  const { data, isLoading, error } = useGetMyCertificatesQuery({ page, limit });

  if (isLoading) return <p>Loading certificates...</p>;
  if (error) return <p>Failed to load certificates.</p>;

  const certificates = data?.data || [];

  return (
    <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 lg:tw:grid-cols-3 tw:gap-6 tw:mt-6">
      {certificates.length > 0 ? (
        certificates.map((cert: any) => (
          <div
            key={cert.id}
            className="tw:bg-white tw:shadow-md tw:rounded-2xl tw:p-5 tw:flex tw:flex-col tw:justify-between tw:transition tw:hover:shadow-lg"
          >
            {/* Course Title */}
            <h3 className="tw:text-lg tw:font-semibold tw:text-gray-800">
              {cert.course.title}
            </h3>

            {/* User Info */}
            <p className="tw:text-sm tw:text-gray-600 tw:mt-1">
              Awarded to:{" "}
              <span className="tw:font-medium">{cert.user.name}</span>
            </p>

            {/* Certificate Code */}
            <p className="tw:text-xs tw:text-gray-500 tw:mt-2">
              Certificate Code:{" "}
              <span className="tw:font-mono">{cert.certificate_code}</span>
            </p>

            {/* Issue Date */}
            <p className="tw:text-xs tw:text-gray-500 tw:mt-1">
              Issued on: {new Date(cert.issue_date).toLocaleDateString()}
            </p>

            {/* Download Button */}
            <a
              href={`https://admin.netflowacademy.com/${cert.path}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="tw:mt-4 tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:bg-indigo-600 tw:text-white tw:px-4 tw:py-2 tw:rounded-lg tw:font-medium tw:hover:bg-blue-700 tw:transition"
            >
              <FaDownload /> Download
            </a>
          </div>
        ))
      ) : (
        <p>No certificates found.</p>
      )}
    </div>
  );
};

export default MyCertificates;
