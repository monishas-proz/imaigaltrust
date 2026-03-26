// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// export default function NavigationLoader() {
//   const pathname = usePathname();

//   useEffect(() => {
//     NProgress.start();

//     setTimeout(() => {
//       NProgress.done();
//     }, 500);
//   }, [pathname]);

//   return null;
// }


"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-[9999] flex items-center justify-center">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}