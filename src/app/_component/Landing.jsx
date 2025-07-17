import React from "react";
import { ManPic } from "./Landing_logo";


const Landing = () => {
  return (
    <div className="flex flex-col  w-screen ">
      <section className="bg-white lg:grid lg:h-[60vh] lg:place-content-center dark:bg-gray-900 ">
        <div className=" w-screen max-w-screen-xl  py-1 sm:px-6 sm:py-8 md:grid md:grid-cols-2  md:gap-4  lg:px-8 lg:py-20">
          <div className="max-w-prose text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
              <strong className="text-indigo-600">24/7 </strong><br/>
               Real News.   <strong className="text-indigo-600">Real Fast. </strong>{" "}
             
            </h1>

            <h1 className="mt-4 text-2xl  font-bold text-pretty text-gray-900 sm:text-lg/relaxed dark:text-gray-200">
             News That Knows Where You Are
            </h1>

            <div className="mt-4 flex gap-4 sm:mt-6 justify-center md:justify-start m-10">
              <a
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                href="/news"
              >
                Explore News
              </a>
            </div>
          </div>

          {ManPic}
        </div>
      </section>
    </div>
  );
};

export default Landing;