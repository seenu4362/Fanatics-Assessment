import MetaHead from "./MetaHead";

export interface IStore {
  slug: string;
  name: string;
  image_background: string;
  games: { slug: string; name: string; added: number }[];
}
export interface IStoresProps {
  stores: IStore[];
}
export default function Stores  ({ stores }: IStoresProps) {
  return (
    <div className="p-5">
       {/* Metadata for the SEO */}
       <MetaHead
        title="Game Stores - Explore Your Favorite Games"
        description="Browse a list of game stores offering popular games with ratings, reviews, and special offers."
        keywords="game stores, game shopping, game reviews, popular games"
        ogTitle="Game Stores - Explore Your Favorite Games"
        ogDescription="Browse a list of game stores offering popular games with ratings, reviews, and special offers."
      />
      {stores?.length > 0 ? (
        // Grid layout for displaying stores
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stores.map((store) => (
            <div
              key={store.slug} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url('${store.image_background}')`,
                }}
              ></div>
              <div className="p-4">
                {/* Store name with link */}
                <h2 className="text-xl font-bold text-center text-white mb-2">
                {store.name}
                </h2>
                {/* Follow button */}
                <div className="flex justify-center">
                  <button
                    className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Follow
                  </button>
                </div>
                <div>
                  {/* List of popular games */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Popular Items
                  </h3>
                  <ul className="space-y-2">
                    {store.games.slice(0, 3).map((game) => (
                      <li
                        key={game.slug} // Unique key for each game
                        className="flex justify-between text-sm text-white"
                      >
                        {/* Game name with link */}
                        <a href={`/games/${game.slug}`} className="hover:underline">
                          {game.name}
                        </a>
                        <span className="text-gray-400">{game.added}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Fallback message when no stores are available
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 text-xl">
            No games found. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
};
