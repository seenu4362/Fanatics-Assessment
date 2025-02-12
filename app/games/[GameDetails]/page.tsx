import { httpService, API_REQUESTS } from "../../api-service/api-service";
import GameDetails from '../../common-components/GameDetails';

interface GameDetailsPageProps {
  params: Promise<{ GameDetails: string }>;
}

interface Platform {
  platform: {
    id: number;
    name: string;
  };
}

interface GameData {
  id: number;
  name: string;
  description: string;
  background_image: string;
  metacritic: number;
  released: string;
  platforms: Platform[];
}

export default async function GameDetailsPage({ params }: GameDetailsPageProps) {
  // Await the resolution of the params to extract the game slug
  const resolvedParams = await params;
  const slug = resolvedParams.GameDetails;

  // If no slug is provided, display an error message
  if (!slug) {
    return (
      <div>
        <h1>Game not found</h1>
      </div>
    );
  }

  let gameData: GameData | null = null; // Variable to store fetched game data

  try {
    // Update the API endpoint dynamically with the game slug
    API_REQUESTS.GET_GAME_DETAILS.URL = `/games/${slug}`;
    // Fetch game data using the HTTP service
    const data = await httpService(API_REQUESTS.GET_GAME_DETAILS);
    gameData = data as GameData; // Cast the response to the GameData type
  } catch (error: unknown) {
    // Log any errors encountered during the API call
    console.error('Error fetching game data:', (error as Error).message);
  }

  // If no game data is fetched, display a fallback message
  if (!gameData) {
    return (
      <div>
        <h1>Game data not available</h1>
      </div>
    );
  }

  // Render the GameDetails component with the fetched game data
  return <GameDetails gameData={gameData} />;
}
