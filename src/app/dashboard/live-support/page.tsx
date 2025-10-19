"use client";

import { useState, useEffect } from "react";

interface ZoomData {
  id: number;
  link: string;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  data: ZoomData;
}

export default function LiveSupportPage() {
  const [zoomData, setZoomData] = useState<ZoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZoomData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://admin.netflowacademy.com/api/zoom/latest"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch live support data");
        }

        const result: ApiResponse = await response.json();

        if (result.success && result.data) {
          setZoomData(result.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchZoomData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="tw:flex tw:items-center tw:justify-center tw:p-4">
      <div className="tw:max-w-sm tw:w-full">
        <div className="tw:bg-gradient-to-br tw:from-purple-500 tw:via-pink-500 tw:to-orange-400 tw:rounded-2xl tw:shadow-2xl tw:p-6">
          {loading ? (
            <div className="tw:text-center">
              <div className="tw:mx-auto tw:w-12 tw:h-12 tw:mb-4 tw:bg-white/20 tw:rounded-full tw:flex tw:items-center tw:justify-center">
                <div className="tw:animate-spin tw:w-6 tw:h-6 tw:border-2 tw:border-white tw:border-t-transparent tw:rounded-full"></div>
              </div>
              <h3 className="tw:text-lg tw:font-bold tw:text-white tw:mb-1">
                Connecting…
              </h3>
              <p className="tw:text-white/80 tw:text-sm">
                Setting up your live support session…
              </p>
            </div>
          ) : error ? (
            <div className="tw:text-center">
              <div className="tw:mx-auto tw:w-12 tw:h-12 tw:mb-4 tw:bg-white/20 tw:rounded-full tw:flex tw:items-center tw:justify-center">
                <svg
                  className="tw:w-6 tw:h-6 tw:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="tw:text-lg tw:font-bold tw:text-white tw:mb-1">
                Connection Failed
              </h3>
              <p className="tw:text-white/80 tw:text-sm tw:mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="tw:w-full tw:bg-white/20 tw:backdrop-blur tw:text-white tw:font-semibold tw:py-2 tw:rounded-xl tw:hover:bg-white/30 tw:transition-all tw:duration-300"
              >
                Retry
              </button>
            </div>
          ) : zoomData ? (
            <div className="tw:text-center">
              <div className="tw:mx-auto tw:w-12 tw:h-12 tw:mb-3 tw:bg-white/20 tw:backdrop-blur tw:rounded-xl tw:flex tw:items-center tw:justify-center">
                <svg
                  className="tw:w-6 tw:h-6 tw:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <h3 className="tw:text-lg tw:font-bold tw:text-white tw:mb-1">
                Live Support
              </h3>
              <div className="tw:flex tw:items-center tw:justify-center tw:mb-2">
                <span className="tw:w-2 tw:h-2 tw:bg-green-300 tw:rounded-full tw:mr-2 tw:animate-pulse"></span>
                <span className="tw:text-green-100 tw:text-xs tw:font-medium">
                  Live
                </span>
              </div>
              <p className="tw:text-white/80 tw:text-sm tw:mb-1">
                Session #{zoomData.id}
              </p>
              <div className="tw:text-white/70 tw:text-xs tw:mb-4">
                {formatDate(zoomData.created_at)}
              </div>
              <a href={zoomData.link} target="_blank" rel="noopener noreferrer">
                <button className="tw:w-full tw:bg-white/20 tw:backdrop-blur tw:text-white tw:font-bold tw:py-2.5 tw:rounded-xl tw:hover:bg-white/30 tw:transition-all tw:duration-300 tw:shadow-lg tw:hover:shadow-xl tw:transform tw:hover:scale-105">
                  Join Live Session
                </button>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
