
// /app/api/news/route.js or /route.ts

import axios from "axios";

const API_KEY = process.env.SECRET_API_KEY // Use the secret key for the external API
export async function POST(req){
  console.log("POST request received in /api/news");
  try {
    const body = await req.json(); // correct: req.json() is async
    const { district} = body;
console.log("Received district:", district);
console.log("Received API key:", API_KEY);
    const link = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${district.toLowerCase()}&country=IN&language=en`;

    const response = await axios.get(link);
// console.log("News data fetched successfully:", response.data);
    return new Response(JSON.stringify({ articles: response.data}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("Error fetching news:", error.message);
    return new Response("Failed to get news", { status: 500 });
  }
};
