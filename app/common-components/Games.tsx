// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { httpService, API_REQUESTS } from "../api-service/api-service";
// import { useRouter } from "next/navigation";
// import Skeleton from "../common-components/Skeleton";
// import Image from "next/image";
// import MetaHead from "./MetaHead";

// type Game = {
//   id: number;
//   name: string;
//   slug: string;
//   released: string;
//   background_image: string;
//   rating: number;
//   rating_top: number;
// };

// type ApiResponse = {
//   results: Game[];
//   next: string;
// };

// export default function Games() {
//   const [games, setGames] = useState<Game[]>([]); // ✅ Corrected type
//   const [loading, setLoading] = useState<boolean>(true);
//   const [nextPageUrl, setNextPageUrl] = useState<string>("");
//   const router = useRouter();

//   const fetchGames = useCallback(async (isScrollToBottom?: boolean) => {
//     setLoading(true);
//     try {
//       const url =
//         isScrollToBottom && nextPageUrl
//           ? nextPageUrl
//           : typeof API_REQUESTS.GET_GAMES === "string"
//           ? API_REQUESTS.GET_GAMES
//           : API_REQUESTS.GET_GAMES.URL;

//       const data: ApiResponse = await httpService(url);
//       setGames((prevGames) => [...prevGames, ...data.results]);
//       setNextPageUrl(data.next);
//     } catch (err) {
//       console.error("Error fetching games:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [nextPageUrl]); // ✅ Added dependencies

//   useEffect(() => {
//     fetchGames();
//   }, [fetchGames]); // ✅ Corrected missing dependency

//   const handleScroll = useCallback(() => {
//     const mainElement = document.querySelector('main') as HTMLElement;
//     if (!mainElement) return;
  
//     const isBottom =
//       mainElement.scrollHeight === mainElement.scrollTop + mainElement.clientHeight;
  
//     if (isBottom) {
//       fetchGames(true);
//     }
//   }, [fetchGames]);
  
//   useEffect(() => {
//     const mainElement = document.querySelector('main') as HTMLElement;
//     if (!mainElement) return;
  
//     mainElement.addEventListener("scroll", handleScroll);
//     return () => {
//       mainElement.removeEventListener("scroll", handleScroll);
//     };
//   }, [handleScroll]);
  
//   const navigateToGameDetails = (game: Game) => {
//     router.push(`/games/${game.slug}`);
// };

//   return (
//     <div>
//       {/* SEO purpose Meta Data */}
//       <MetaHead
//         title="Explore Popular Games - New and Trending"
//         description="Browse a wide collection of new and trending games with ratings, reviews, and more."
//         keywords="games, trending games, new games, game library, game ratings, game reviews"
//         ogTitle="Explore Popular Games - New and Trending"
//         ogDescription="Browse a wide collection of new and trending games with ratings, reviews, and more."
//         twitterTitle="Explore Popular Games - New and Trending"
//       />

//       {loading && games.length === 0 ? (
//         <Skeleton numberOfGrids={8} />
//       ) : games.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {games.map((game, index) => (
//             <div
//               key={`${game.id}-${index}`}
//               className="max-w-xs rounded overflow-hidden shadow-lg bg-white m-4"
//               onClick={() => navigateToGameDetails(game)}
//             >
//               <Image
//                 className="w-full h-48 object-cover"
//                 width={400}
//                 height={200}
//                 placeholder="blur"
//                 blurDataURL="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
//                 src={game.background_image}
//                 alt={game.name}
//               />
//               <div className="px-6 py-4">
//                 <h2 className="font-bold text-xl text-gray-800">{game.name}</h2>
//                 <p className="text-gray-600 text-sm">Released: {game.released}</p>
//                 <div className="flex items-center">
//                   <span className="text-yellow-500">{game.rating}</span>
//                   <span className="ml-2 text-gray-500">/ {game.rating_top}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-screen">
//           <p className="text-gray-500 text-xl">No games found. Please try again later.</p>
//         </div>
//       )}

//       {loading && games.length > 0 && <Skeleton numberOfGrids={4} />}
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState, useCallback } from "react";
import { httpService, API_REQUESTS } from "../api-service/api-service";
import { useRouter } from "next/navigation";
import Skeleton from "../common-components/Skeleton";
import Image from "next/image";
import MetaHead from "./MetaHead";

type Game = {
  id: number;
  name: string;
  slug: string;
  released: string;
  background_image: string;
  rating: number;
  rating_top: number;
};

type ApiResponse = {
  results: Game[];
  next: string;
};

export default function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const router = useRouter();

  const fetchGames = async (isScrollToBottom = false) => {
    setLoading(true);
    try {
      const url =
        isScrollToBottom && nextPageUrl
          ? nextPageUrl
          : API_REQUESTS.GET_GAMES;

      const data: ApiResponse = await httpService(url);
      
      setGames((prevGames) => [...prevGames, ...data.results]);

      setNextPageUrl((prevUrl) => data.next || prevUrl); // ✅ Functional state update
    } catch (err) {
      console.error("Error fetching games:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(); // ✅ Removed dependencies to prevent re-renders
  }, []);

  const handleScroll = useCallback(() => {
    const mainElement = document.querySelector("main") as HTMLElement;
    if (!mainElement) return;

    const isBottom =
      mainElement.scrollHeight === mainElement.scrollTop + mainElement.clientHeight;

    if (isBottom) {
      fetchGames(true);
    }
  }, [nextPageUrl]); // ✅ `nextPageUrl` is now stable

  useEffect(() => {
    const mainElement = document.querySelector("main") as HTMLElement;
    if (!mainElement) return;

    mainElement.addEventListener("scroll", handleScroll);
    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const navigateToGameDetails = (game: Game) => {
    router.push(`/games/${game.slug}`);
  };

  return (
    <div>
      {/* SEO purpose Meta Data */}
      <MetaHead
        title="Explore Popular Games - New and Trending"
        description="Browse a wide collection of new and trending games with ratings, reviews, and more."
        keywords="games, trending games, new games, game library, game ratings, game reviews"
        ogTitle="Explore Popular Games - New and Trending"
        ogDescription="Browse a wide collection of new and trending games with ratings, reviews, and more."
        twitterTitle="Explore Popular Games - New and Trending"
      />

      {loading && games.length === 0 ? (
        <Skeleton numberOfGrids={8} />
      ) : games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((game, index) => (
            <div
              key={`${game.id}-${index}`}
              className="max-w-xs rounded overflow-hidden shadow-lg bg-white m-4"
              onClick={() => navigateToGameDetails(game)}
            >
              <Image
                className="w-full h-48 object-cover"
                width={400}
                height={200}
                placeholder="blur"
                blurDataURL="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                src={game.background_image}
                alt={game.name}
              />
              <div className="px-6 py-4">
                <h2 className="font-bold text-xl text-gray-800">{game.name}</h2>
                <p className="text-gray-600 text-sm">Released: {game.released}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500">{game.rating}</span>
                  <span className="ml-2 text-gray-500">/ {game.rating_top}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 text-xl">No games found. Please try again later.</p>
        </div>
      )}

      {loading && games.length > 0 && <Skeleton numberOfGrids={4} />}
    </div>
  );
}
