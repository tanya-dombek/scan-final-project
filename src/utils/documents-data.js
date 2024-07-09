import moment from 'moment';

export const transformIdsData = (data, countNumber) => {
    const ids = data.map(item => item.encodedId);
  
    const limitedIds = ids.slice(countNumber, countNumber + 100);
  
    return { ids: limitedIds };
};

const parseXML = (xmlString, wordCount) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const scandoc = xmlDoc.getElementsByTagName("scandoc")[0];
    let maxWordDisplayed = 60;

    let articleText = scandoc.textContent;

    const imgRegex = /<img src="([^"]+)"\/?>/;
    const imgMatch = articleText.match(imgRegex);
    const imageUrl = imgMatch ? imgMatch[1] : '';

    if (!imageUrl) {
        maxWordDisplayed = 120;
    }

    articleText = articleText.replace(/<[^>]*>/g, '').replace(/\s\s+/g, ' ').replace(/=+/g, ' ').trim();

    const textSnippet = wordCount > maxWordDisplayed ? articleText.split(' ').slice(0, maxWordDisplayed).join(' ') + '...' : articleText;
    return {
        text: textSnippet,
        imageUrl: imageUrl,
    };
};

const trimTitle = (title) => {
    const splittedTitle = title.split(' ');
    const titleSnippet = splittedTitle.length > 8 ? splittedTitle.slice(0, 8).join(' ') + '...' : title;
    return titleSnippet
}

export const parseDocuments = (docs) => {
    const parsedData = docs.map((item) => {
        return {
            id: item.id,
            issueDate: moment(item.issueDate).format('DD.MM.YYYY'),
            url: item.url,
            source: item.source.name,
            title: trimTitle(item.title.text),
            content: parseXML(item.content.markup, item.attributes.wordCount),
            wordCount: item.attributes.wordCount,
            attribute: item.attributes.isTechNews ? 'Технические новости' : item.attributes.isAnnouncement ? 'Анонсы и события' : item.attributes.isDigest ? 'Сводки новостей' : ''
        };
    });

    return parsedData;
};