import React from "react";
import Image from "next/image";

type Platform = {
  platform: {
    id: number;
    name: string;
  };
};

type Screenshot = {
  image: string;
};

type GameData = {
  name: string;
  background_image: string;
  description: string;
  metacritic: number;
  released: string;
  platforms: Platform[];
  short_screenshots?: Screenshot[];
};

type GameDetailsProps = {
  gameData: GameData;
};

const GameDetails: React.FC<GameDetailsProps> = ({ gameData }) => {
  const formattedDescription = gameData.description.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags for SEO

  return (
    <div>
   
      {/* Hero Section */}
      <div className="relative w-full">
        <div className="relative w-full h-96 overflow-hidden">
          <Image
            src={gameData.background_image}
            alt={gameData.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center top"
            className="rounded-b-3xl shadow-lg"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
      </div>
      <div className="mt-5 container mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{gameData.name}</h1>
        </div>
      </div>

      {/* Game Details */}
      <div className="container mx-auto p-6 space-y-8">
        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
          <p className="mt-4 text-gray-600">{formattedDescription}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800">Metacritic</h2>
            <p className="mt-2 text-green-600 font-bold">{gameData.metacritic}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800">Released</h2>
            <p className="mt-2 text-gray-600">{gameData.released}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800">Platforms</h2>
            <ul className="mt-2 space-y-1 text-gray-600">
              {gameData.platforms.map((platform) => (
                <li key={platform.platform.id}>{platform.platform.name}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Screenshots */}
        {gameData.short_screenshots && gameData.short_screenshots.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Screenshots</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {gameData.short_screenshots.map((screenshot, index) => (
                <div key={index} className="relative w-full h-40">
                  <Image
                    src={screenshot.image}
                    alt={`Screenshot ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetails;
