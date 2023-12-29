import { api } from './ApiUtilities'

export const GitaKeywordSearch = async (keyword) => {
    const results = [];
    const totalChapters = 18;

    for (let chapter = 1; chapter <= totalChapters; chapter++) {
        let verse = 1;
        let keepSearching = true;

        while (keepSearching) {
            try {
                const response = await api.get(`BG/eng/chapter/${chapter}/verse/${verse}/`);
                const verseText = response.data;

                if (verseText.toLowerCase().includes(keyword.toLowerCase())) {
                    results.push({
                        text: verseText,
                        reference: `Chapter ${chapter}, Verse ${verse}`
                    });
                }
                verse++;
            } catch (error) {
                console.error(`Error fetching chapter ${chapter}, verse ${verse}:`, error);
                keepSearching = false;
            }
        }
    }
    return results;
};