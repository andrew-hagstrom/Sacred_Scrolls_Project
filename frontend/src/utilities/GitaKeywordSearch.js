import { api } from './ApiUtilities'

export const GitaKeywordSearch = async (keyword) => {
    const matchedVerses = [];
    const totalChapters = 18;

    for (let chapter = 1; chapter <= totalChapters; chapter++) {
        let verse = 1;
        let keepSearching = true;

        while (keepSearching) {
            try {
                const response = await api.get(`BG/eng/chapter/${chapter}/verse/${verse}/`);

                // Log the response for debugging
                console.log(`Response for chapter ${chapter}, verse ${verse}:`, response);

                const verseText = response.data; // Directly access the verse text

                if (verseText && verseText.toLowerCase().includes(keyword.toLowerCase())) {
                    matchedVerses.push({
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
    console.log(matchedVerses);
    return matchedVerses;
};
