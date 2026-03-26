import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import Image from "next/image";
import React from "react";
import "./page.css";

export default function ProgramAgriculture() {
  const breadrumbs = [
    { id: 1, name: "Programs", link: "/" },
    { id: 2, name: "Agriculture" },
  ];

  return (
    <div>
      <PageBanner title="Agriculture" list={breadrumbs} />

      <section className="py-10 max-w-[1600px] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-8 justify-center">
        <Image
          src="/assets/images/agriculture.png"
          width={346.87}
          height={348.76}
          className="rounded-full object-cover w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]"
          alt="agriculture"
        />

        <div className="w-full  h-auto  flex flex-col gap-6 justify-center md:ml-12">
          <p className="text-2xl uppercase primary-text poppins-font weihgt">
            Agriculture-Based Initiatives
          </p>
          <h2 className="text-[36px] leading-[46px] font-medium text-[#1B2F7C] font-poppins">
            <span className="block">Empowering Farmers, Sustaining</span>
            <span className="block">Agriculture</span>
          </h2>

          <p className="font-poppins font-normal text-[18px] leading-[30px] text-[#101010] ">
            Agri-Bra is a flagship initiative of Imaigal Trust aimed at
            transforming rural agriculture through innovation, sustainability,
            and community-driven practices. We work closely with farmers,
            agricultural experts, and industry partners to enhance productivity,
            ensure food security, and promote eco-friendly farming methods.
          </p>
        </div>
      </section>

      <section className="pb-10 max-w-[1600px] mx-auto px-4 md:px-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 mt-5">
  <div className="w-full lg:w-2/3 flex flex-col gap-6">
    <div className="section-box-lg">
      <h3 className="font-poppins font-medium text-[20px] md:text-[22px] leading-[28px] tracking-normal text-[#101010]">
        Farmer Producer Organizations (FPOs)
      </h3>
      <p className="font-poppins font-normal text-[12px] md:text-[17px] leading-[26px] md:leading-[28px] text-gray-500 mb-5">
  Supporting farmers through NABARD-backed FPCs, providing training,
  resources, and
  
    financial assistance for better productivity and market access.

</p>
    </div>

    <div className="section-box-lg">
      <h3 className="font-poppins font-medium text-[22px] md:text-[24px] leading-[30px] tracking-normal text-[#101010]">
        Organic & Sustainable Farming
      </h3>
      <p className="font-poppins font-normal text-[15px] md:text-[17px] leading-[26px] md:leading-[28px] text-gray-500 mb-5">
        Encouraging eco-friendly agricultural practices, organic certification
        programs, and training on natural pest control and soil health
        management
      </p>
    </div>

    <div className="section-box-lg">
      <h3 className="font-poppins font-medium text-[22px] md:text-[24px] leading-[30px] tracking-normal text-[#101010]">
        Water Conservation & Climate Resilience
      </h3>
      <p className="font-poppins font-normal text-[15px] md:text-[17px] leading-[26px] md:leading-[28px] text-gray-500 mb-5">
        Implementing rainwater harvesting, drip irrigation, and sustainable
        water management strategies to combat climate change effects on farming
      </p>
    </div>
  </div>

  <div className="w-full lg:w-1/3 flex justify-center">
    <Image
      src="/assets/images/agriculture.png"
      width={565.25}
      height={374}
      alt="agriculture"
      className="w-full max-w-[420px] h-auto"
    />
  </div>
</section>

<section className="w-full max-w-[1600px] mx-auto pt-0 px-4 md:px-10 mb-10">
  <div className="flex flex-col gap-6 w-full">
    <div className="section-box-lg w-full">
      <h3 className="font-poppins font-medium text-[22px] md:text-[24px] leading-[30px] text-[#101010]">
        Technology &amp; Innovation in Agriculture
      </h3>
      <p className="font-poppins font-normal text-[15px] md:text-[17px] leading-[26px] md:leading-[28px] text-gray-500 mb-5">
        Implementing rainwater harvesting, drip irrigation, and sustainable
        water management strategies to combat climate change effects on farming.
      </p>
    </div>

    <div className="section-box-lg w-full">
      <h3 className="font-poppins font-medium text-[22px] md:text-[24px] leading-[30px] text-[#101010]">
        Technology &amp; Innovation in Agriculture
      </h3>
      <p className="font-poppins font-normal text-[15px] md:text-[17px] leading-[26px] md:leading-[28px] text-gray-500 mb-5">
        Implementing rainwater harvesting, drip irrigation, and sustainable
        water management strategies to combat climate change effects on farming.
      </p>
    </div>

    <div className="section-box-lg w-full">
      <h3 className="font-poppins font-medium text-[22px] md:text-[24px] leading-[30px] text-[#101010]">
        Market Linkages &amp; Financial Support
      </h3>
      <p className="font-poppins font-normal text-[15px] md:text-[17px] leading-[26px] md:leading-[28px] text-gray-500 mb-5">
        Implementing rainwater harvesting, drip irrigation, and sustainable
        water management strategies to combat climate change effects on farming.
      </p>
    </div>
  </div>
</section>
    </div>
  );
}
