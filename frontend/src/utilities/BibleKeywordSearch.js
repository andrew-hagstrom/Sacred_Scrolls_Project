import { api } from './ApiUtilities'
import { bibleBooksChapters } from './BibleBooks'
 
export const BibleKeywordSearch = async (keyword) => {
    let results = [];

    for (const [book, chaptersCount] of Object.entries(bibleBooksChapters)) {
        for (let chapter = 1; chapter <= chaptersCount; chapter++) {
            const chapterData = await fetchChapterData(book, chapter);
            if (chapterData.includes(keyword)) {
                results.push ({
                    book: book,
                    chapter: chapter,
                    text: chapterData

                });
            }
        }
    }

        return results;

    };

    const fetchChapterData = async (book, chapter) => {
        const response = await api.get(`Bible/eng/${book}/chapter/${chapter}/`)
        return response.data
    };
    