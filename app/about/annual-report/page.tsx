import AnnualReport from "@/app/component/AnualReport/AnnualReport";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import React from "react";

export default function page() {
  const breadrumbs = [
    { id: 1, name: "About us", link: "/" },
    { id: 2, name: "Annual Reports" },
  ];
  return (
    <>
      <PageBanner title="Annual Reports" list={breadrumbs} />
      
      <AnnualReport />
    </>
  );
}
