export const bibleBookIdAndTestament = {
    'genesis': ['gen', 'old'],
    'exodus': ['exo', 'old'],
    'leviticus': ['lev', 'old'],
    'numbers': ['num', 'old'],
    'deuteronomy': ['deu', 'old'],
    'joshua': ['jos', 'old'],
    'judges': ['jud', 'old'],
    'ruth': ['rut', 'old'],
    '1samuel': ['1sa', 'old'],
    '2samuel': ['2sa', 'old'],
    '1kings': ['1ki', 'old'],
    '2kings': ['2ki', 'old'],
    '1chronicles': ['1ch', 'old'],
    '2chronicles': ['2ch', 'old'],
    'ezra': ['ezr', 'old'],
    'nehemiah': ['neh', 'old'],
    'esther': ['est', 'old'],
    'job': ['job', 'old'],
    'psalms': ['psa', 'old'],
    'proverbs': ['pro', 'old'],
    'ecclesiastes': ['ecc', 'old'],
    'songofsolomon': ['sng', 'old'],
    'isaiah': ['isa', 'old'],
    'jeremiah': ['jer', 'old'],
    'lamentations': ['lam', 'old'],
    'ezekiel': ['eze', 'old'],
    'daniel': ['dan', 'old'],
    'hosea': ['hos', 'old'],
    'joel': ['joe', 'old'],
    'amos': ['amo', 'old'],
    'obadiah': ['oba', 'old'],
    'jonah': ['jon', 'old'],
    'micah': ['mic', 'old'],
    'habakkuk': ['hab', 'old'],
    'zephaniah': ['zep', 'old'],
    'haggai': ['hag', 'old'],
    'zechariah': ['zec', 'old'],
    'malachi': ['mal', 'old'],
    'matthew': ['mat', 'new'],
    'mark': ['mrk', 'new'],
    'luke': ['luk', 'new'],
    'john': ['jhn', 'new'],
    'acts': ['act', 'new'],
    'romans': ['rom', 'new'],
    '1corinthians': ['1co', 'new'],
    '2corinthians': ['2co', 'new'],
    'galatians': ['gal', 'new'],
    'ephesians': ['eph', 'new'],
    'philippians': ['phi', 'new'],
    'colossians': ['col', 'new'],
    '1thessalonians': ['1th', 'new'],
    '2thessalonians': ['2th', 'new'],
    '1timothy': ['1ti', 'new'],
    '2timothy': ['2ti', 'new'],
    'titus': ['tit', 'new'],
    'philemon': ['phi', 'new'],
    'hebrews': ['heb', 'new'],
    'james': ['jas', 'new'],
    '1peter': ['1pe', 'new'],
    '2peter': ['2pe', 'new'],
    '1john': ['1jn', 'new'],
    '2john': ['2jn', 'new'],
    '3john': ['3jn', 'new'],
    'jude': ['jud', 'new'],
    'revelation': ['rev', 'new']
};

export const checkIfOldTestament = (bookName) => {
    const key = bookName.toLowerCase().replace(/\s+/g, '');
    return bibleBookIdAndTestament[bookName] && bibleBookIdAndTestament[bookName][1] === 'old'
}