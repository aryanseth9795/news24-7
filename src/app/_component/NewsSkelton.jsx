'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const SkeletonCard = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "w-full h-[50vh] bg-white shadow-md rounded-lg p-4 flex flex-col lg:flex-row justify-start gap-10 transition-opacity duration-700",
        inView ? "opacity-100 animate-pulse" : "opacity-0"
      )}
    >
      <div className="bg-gray-300 rounded-md w-full lg:w-[400px] h-[300px]" />
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-[90%]" />
        <div className="h-10 bg-gray-300 rounded w-32 mt-4" />
      </div>
    </div>
  );
};

const NewsSkeleton = ({ count = 3 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
};

export default NewsSkeleton;
