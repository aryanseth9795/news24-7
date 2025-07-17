import React from "react";
import { Button } from "@/components/ui/button";

const NewsItem = ({ title, description, image, link }) => {
  return (
    <div className="w-full h-card bg-white shadow-md rounded-lg p-8 flex flex-col md:flex-row justify-start gap-10">
      <img
        src={image}
        alt={title}
        width={300}
        height={300}
        className="rounded-md"
      />
      <div className="flex flex-col justify-start gap-2 p-10 ">
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        <h2 className="text-md text-gray-600 mt-5 ">{description}</h2>
        <Button className="mt-2 w-32"   onClick={() => window.open(link, "_blank")}>Read More</Button>
      </div>
    </div>
  );
};

export default NewsItem;
