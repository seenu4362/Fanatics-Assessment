"use client";

import React, { useEffect, useState, useCallback } from "react";
import { httpService, API_REQUESTS } from "../api-service/api-service";
import Link from "next/link";
import Skeleton from "./Skeleton";
import MetaHead from "./MetaHead";

// Define TypeScript interfaces for Leaderboard, Positions, and Games data
interface ILeaderboard {
  id: number;
  name: string;
  image: string;
  image_background: string;
  positions: IPositions[];
  games: IGames[];
}

interface IPositions {
  name: string;
}

interface IGames {
  id: number;
  name: string;
  slug: string;
  added: number;
}

export default function LeaderBoardDeatils() {
  // State to store creator data, loading status, and pagination URL
  const [leaders, setLeaders] = useState<ILeaderboard[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState("");

  // Function to fetch leaders data (supports pagination)
  const getLeaders = useCallback(async (isScrollToBottom?: boolean) => {
    setLoading(true); // Show loading indicator
    try {
      const data = await httpService(
        isScrollToBottom ? nextPageUrl : API_REQUESTS.GET_CREATORS.URL
      );
      if (data?.results) {
        setLeaders((prevCreators: ILeaderboard[]) => [
          ...prevCreators,
          ...data.results,
        ]); // Append new leaders to the list
        setNextPageUrl(data?.next); // Update next page URL
      } else {
        console.error("No leaders found"); // Handle case when no leaders are returned
      }
    } catch (error) {
      console.error(error); // Log any errors
    } finally {
      setLoading(false); // Hide loading indicator
    }
  }, [nextPageUrl]);

  // Fetch initial list of leaders when the component mounts
  useEffect(() => {
    getLeaders();
  }, [getLeaders]);

  // Callback to handle infinite scrolling logic
  const handleScroll = useCallback(() => {
    const mainElement = document.querySelector('main') as HTMLElement;
    if (!mainElement) return;
  
    const isBottom =
      mainElement.scrollHeight === mainElement.scrollTop + mainElement.clientHeight;
  
    if (isBottom && nextPageUrl) {
      getLeaders(true); // Load more leaders when reaching the bottom
    }
  }, [getLeaders, nextPageUrl]);
  
  // Attach and detach the scroll event listener to ".main"
  useEffect(() => {
    const mainElement = document.querySelector('main') as HTMLElement;
    if (!mainElement) return;
  
    mainElement.addEventListener("scroll", handleScroll);
    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  


  return (
    <div className="p-5">
      {/* //SEO purpose Meta Data */}
      <MetaHead
        title="Creators List - Top Game Creators & Influencers"
        description="Explore top game creators and influencers who have contributed to popular gaming content."
        keywords="game creators, game influencers, gaming content, popular creators, top game influencers"
        ogTitle="Top Game Creators"
        ogDescription="Discover the best game creators and influencers, their content, and the games they are known for."
      />
      {/* Main content: Conditional rendering based on data and loading state */}
      {loading && leaders.length === 0 ? (
        <Skeleton numberOfGrids={8} /> // Show skeleton loader while loading initial data
      ) : leaders.length > 0 ? (
        // Grid layout to display leaders
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {leaders.map((creator: ILeaderboard, index: number) => (
            <div
              key={`${creator.id}-${index}`}
              className="w-full md:w-70 bg-gray-900 rounded-lg overflow-hidden shadow-lg"
              style={{
                backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${creator.image_background})`,
              }}
            >
              <div className="p-5">
                {/* Creator profile and details */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-gray-700"
                    style={{ backgroundImage: `url(${creator.image})` }}
                  />
                  <h2 className="mt-4 text-xl font-bold text-white">
                    {creator.name}
                  </h2>
                  <p className="text-gray-400 mt-1 capitalize">
                    {creator.positions.map((pos: IPositions) => pos.name).join(", ")}
                  </p>
                </div>
                {/* Follow button */}
                <div className="flex justify-center">
                  <button className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-400 transition-colors">
                    Follow
                  </button>
                </div>
                {/* Games the creator is known for */}
                <div className="mt-6">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    Known for
                  </h3>
                  <ul className="space-y-2">
                    {creator?.games.slice(0, 3).map((game: IGames) => (
                      <li
                        key={game.id}
                        className="flex justify-between items-center"
                      >
                        <Link style={{ color: "#c7ccd5" }} href={`/games/${game.slug}`}>
                          {game.name}
                        </Link>
                        <span className="text-gray-400">{game.added.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Display message if no leaders are found
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 text-xl">
            No Leaders found. Please try again later.
          </p>
        </div>
      )}

      {/* Show additional skeleton loaders if loading more data */}
      {loading && leaders.length > 0 && <Skeleton numberOfGrids={4} />}
    </div>
  );
}


