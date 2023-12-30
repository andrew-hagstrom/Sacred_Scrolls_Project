import { api } from './ApiUtilities'

export const GitaKeywordSearch = async (keyword) => {
    try {
     
        const response = await api.get(`search/${keyword}/`);
        // Extracting the results from the response
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching Gita verses:`, error);
        return [];
    }
};