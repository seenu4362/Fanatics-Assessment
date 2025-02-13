import { httpService, API_REQUESTS } from "../api-service/api-service";
import Stores from "../common-components/Stores";

export interface IStore {
  slug: string;
  name: string;
  image_background: string;
  games: { slug: string; name: string; added: number }[];
}
/**
 * Fetches and displays a list of stores.
 * Uses the `httpService` to retrieve store data from the API.
 * 
 * @returns A `Stores` component with the fetched store data.
 */
const StoresPage = async () => {
  let stores: IStore[] = [];
  try {
    const data = await httpService(API_REQUESTS.GET_STORES);
    stores = data.results;
  } catch (error) {
    console.error("Error fetching stores:", error);
  }

  return <Stores stores={stores} />;
};

export default StoresPage;
