import axios from "axios";

// API Configuration
const API_KEY = 'f9d23cb4fa4544fdbbe7ba5f414cc256';
const BASE_URL = 'https://api.rawg.io/api';

// Axios instance for reusable API requests
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: { key: API_KEY },
});

// API Endpoints
export const apiEndPoints = {
    games: '/games',
    stores: '/stores',
    creators: '/creators',
};

// Type Definitions
type RequestMethod = 'GET' | 'POST';

interface IApiService {
    METHOD: RequestMethod;
    URL: string;
    PARAMS?: Record<string, unknown>;
    PAYLOAD?: Record<string, unknown>;
}

// API Requests Configuration
export const API_REQUESTS: Record<string, IApiService> = {
    GET_GAMES: { METHOD: 'GET', URL: apiEndPoints.games },
    GET_GAME_DETAILS: { METHOD: 'GET', URL: '' },
    GET_STORES: { METHOD: 'GET', URL: apiEndPoints.stores },
    GET_CREATORS: { METHOD: 'GET', URL: apiEndPoints.creators },
};

// HTTP Service Handler
export const httpService = async (request: IApiService | string) => {
    try {
        if (typeof request === "string") {
            const response = await axiosInstance.get(request);
            return response.data;
        }

        const { METHOD, URL, PARAMS, PAYLOAD } = request;
        const config = { params: { ...PARAMS } };

        if (METHOD === 'GET') {
            const response = await axiosInstance.get(URL, config);
            return response.data;
        } else if (METHOD === 'POST') {
            const response = await axiosInstance.post(URL, PAYLOAD || {}, config);
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
