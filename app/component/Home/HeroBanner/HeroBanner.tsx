"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeroBannerImage } from "@/app/content/Home";
import './HeroBanner.css'
export default function HeroBanner() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 2 seconds
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {HeroBannerImage.map((item) => (
        <div key={item?.id}>
          <Image
            src={item?.img}
            alt="image"
            width={200}
            height={100}
            className="w-full"
          />
        </div>
      ))}
    </Slider>
  );
}