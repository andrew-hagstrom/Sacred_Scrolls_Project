import { api } from './ApiUtilities';

export const QuranKeywordSearch = async (keyword, lang = 'en') => {
    try {
        const response = await api.get(`Quran/${lang}/${keyword}/`);
        return response.data.data; 
    } catch (error) {
        console.error(`Error fetching Quran verses:`, error);
        return [];
    }
};