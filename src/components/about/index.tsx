"use client";

import Breadcrumb from "../common/Breadcrumb";
import AboutHomeOne from "../home/AboutHome";
import CounterHomeOne from "../home/CounterHome";
import FeatureHomeOne from "../home/FeatureHome";
import InstructorsHomeOne from "../home/InstructorsHome";

export default function About() {
  return (
    <>
      <Breadcrumb title="About Us" subtitle="About Us" />
      <FeatureHomeOne />
      <AboutHomeOne />
      <CounterHomeOne />
      <InstructorsHomeOne />
    </>
  );
}
