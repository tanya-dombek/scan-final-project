export const histogramReq = {
    issueDateInterval: {
      startDate: "2020-05-10T11:28:08.9047467+03:00",
      endDate: "2024-06-20T11:28:08.9047467+03:00"
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: 7710137066,
            maxFullness: true,
            inBusinessNews: false
          }
        ],
        onlyMainRole: true,
        tonality: "any",
        onlyWithRiskFactors: false,
        riskFactors: {
          and: [],
          or: [],
          not: []
        },
        themes: {
          and: [],
          or: [],
          not: []
        }
      },
      themesFilter: {
        and: [],
        or: [],
        not: []
      }
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: []
    },
    attributeFilters: {
      excludeTechNews: true,
      excludeAnnouncements: true,
      excludeDigests: true
    },
    similarMod: "duplicates",
    limit: 1000,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: [
      "totalDocuments",
      "riskFactors"
    ]
}

export const updateRequest = (newData) => {
    const updatedHistogramReq = {
        ...histogramReq,
        issueDateInterval: {
            startDate: newData.startDate,
            endDate: newData.endDate
        },
        searchContext: {
            ...histogramReq.searchContext,
            targetSearchEntitiesContext: {
              ...histogramReq.searchContext.targetSearchEntitiesContext,
              targetSearchEntities: histogramReq.searchContext.targetSearchEntitiesContext.targetSearchEntities.map(entity => ({
                ...entity,
                inn: Number(newData.inn),
                maxFullness: newData.maxFullness,
                inBusinessNews: newData.inBusinessNews,
            })),
              onlyMainRole: newData.onlyMainRole,
              tonality: newData.tonality,
              onlyWithRiskFactors: newData.onlyWithRiskFactors,
            }
        },
          attributeFilters: {
            excludeTechNews: newData.excludeTechNews,
            excludeAnnouncements: newData.excludeAnnouncements,
            excludeDigests: newData.excludeDigests
        },
        limit: Number(newData.limit),
    }
    return updatedHistogramReq;
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const transformHistogramData = (histogramData) => {
  const output = {};

  histogramData.forEach(item => {
    const { histogramType, data } = item;

    data.forEach(({ date, value }) => {
      const formattedDate = formatDate(date);
      if (!output[formattedDate]) {
        output[formattedDate] = { date: formattedDate };
      }
      output[formattedDate][histogramType] = value;
    });
  });

  const transformedData = Object.values(output);

  return transformedData;
}