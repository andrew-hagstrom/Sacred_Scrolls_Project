
export const GitaKeywordSearch = async (keyword) => {
    const matchedVerses = []
    const totalChapters = 18;

    for (let chapter = 1; chapter <= totalChapters; chapter++) {
        let verse = 1;
        let keepSearching = true;

        while (keepSearching) {
            try {
                const response = await api.get(`BG/eng/chapters/${chapter}/verse/${verse}`)
                const verseText = response.data;

                if (verseText.includes(keyword)) {
                    matchedVerses.push({
                        text: verseText,
                        reference: `Chapter ${chapter}, Verse ${verse}`
                    });
                }
                verse++
            } catch(error) {
                keepSearching = false;
            }
        }
    }
    return matchedVerses;
};