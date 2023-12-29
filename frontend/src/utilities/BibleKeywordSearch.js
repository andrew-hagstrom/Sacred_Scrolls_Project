import { api } from './ApiUtilities'


export const BibleKeywordSearch = async (keyword) => {
    try {
        const response = await api.get(`Bible/${keyword}`);
        return response.data.verses;
    } catch (error) {
        console.error(`Error fetching Bible verses:`, error);
        return [];
    }
};
    