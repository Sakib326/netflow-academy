"use client";

// export default ScrollTop;
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollTop: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollTop;
