"use client";
// import { useState, useRef } from "react";
import PageBanner from "@/app/component/Banner/PageBanner/PageBanner";
import "./page.css";
import MembershipForm from "./MembershipForm";


export default function Membership() {
   return(
    <div className="">
      <PageBanner title="Membership" list={[{ id: 1, name: "Membership", link: "/" }]} />
      <div className="membership-content">
          <MembershipForm />
        </div>
    </div>
   )
}
