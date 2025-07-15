"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NewsItem from "../_component/NewsItem";
import { toast } from "sonner";
import NewsSkeleton from "../_component/NewsSkelton";
import News_Header from "../_component/News_Header";

const News = () => {
  const [district, setDistrict] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_GEO_API_KEY;

  // 🔍 Network info check
  const checkNetworkStatus = () => {
    const isOnline = navigator.onLine;
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    toast(`✅ User is ${isOnline ? "online" : "offline"}`);
    if (connection) {
      toast(`📶 Effective connection type: ${connection.effectiveType}`);
    } else {
      toast("⚠️ Network Information API not supported in this browser.");
    }
  };

  const firstLoad = useRef(true);
  useEffect(() => {
    const notifyStatus = () => {
      const isOnline = navigator.onLine;

      if (isOnline) {
        checkNetworkStatus();
      }
      // First load
      if (firstLoad.current) {
        firstLoad.current = false;
        if (!isOnline) toast.error("You are offline.");
        return;
      }

      // Only show toast if status changes after first render
      if (isOnline) {
        toast.success("You're back online.");
      } else {
        toast.error("🔴 You went offline.");
      }
    };

    // Initial status check
    notifyStatus();

    // Event listeners
    window.addEventListener("online", notifyStatus);
    window.addEventListener("offline", notifyStatus);

    return () => {
      window.removeEventListener("online", notifyStatus);
      window.removeEventListener("offline", notifyStatus);
    };
  }, []);

  const fetchDistrictAndNews = async () => {
    try {
      navigator.geolocation?.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

        // 1. Get district from OpenCage API
        const geoRes = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}`
        );

        const districtName =
          geoRes?.data?.results[0]?.components?.state_district || "delhi";
        setDistrict(() => districtName);
        toast.success(`📍 Your location is: ${districtName}`);
      });
    } catch (error) {
      toast.error("❌ Failed to fetch district. Please try again.");
      setDistrict("delhi"); // Fallback to a default district
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };

  // Fetch district and news on initial load
  useEffect(() => {
    fetchDistrictAndNews();
  }, []);

  const fetchNews = async (district) => {
    try {
      setLoading(true);
      const newsRes = await axios.post("/api/news", {
        district,
      });
      if (
        !newsRes?.data?.articles?.results ||
        newsRes.data.articles.results.length === 0
      ) {
        toast.error("❌ Failed to fetch news. Please try again.");
        setArticles([
          {
            title: "No news found at this city! Maybe try another city?",
            description: "Please try again later.",
            image_url: "/Logo.png",
            link: "#",
          },
        ]);
        return;
      }
      setArticles(newsRes?.data?.articles?.results);
    } catch (error) {
      console.error("❌ Error fetching news:", error);
      toast.error("❌ Failed to fetch news. Please try again.");
      setArticles([
        {
          title: "No news found",
          description: "Please try again later.",
          image_url: "/Logo.png",
          link: "#",
        },
      ]);
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };
  useEffect(() => {
    if (district && district.trim() !== "") {
      fetchNews(district);
    }
  }, [district]);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-10 bg-gray-300 items-center justify-center">
      {loading ? (
        <NewsSkeleton count={3} />
      ) : (
        <>
          <div className="w-full flex flex-col items-center justify-center gap-6 py-8 bg-white shadow-sm">
            <News_Header setDistrict={setDistrict} />
          </div>
          <div className="w-[90%] flex flex-col gap-6 justify-center items-center">
            {district && (
              <h1 className="text-2xl font-bold text-gray-800">
                Latest News in {district}
              </h1>
            )}
            {articles.length > 0 &&
              articles.map((article, index) => (
                <NewsItem
                  key={index}
                  link={article.link}
                  title={article.title}
                  description={article.description}
                  image={article.image_url}
                />
              ))}
          </div>
          <div className="text-center mt-8 text-lg text-black-600 font-bold">
            Want More news?{" "}
            <a
              href="https://news.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              Click here
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default News;
