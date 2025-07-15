"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const nav = useRouter();
  return (
    <div className="flex px-10 items-center justify-between sticky top-0 left-0 right-0 z-10 bg-white border shadow-md">
      <Image src="/Logo.png" alt="logo" width={180} height={100} />
      <Button
        className={"font-bold text-1xl"}
        onClick={() => {
          nav.push("/news");
        }}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Header;
