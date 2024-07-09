export const BASE_URL = 'https://gateway.scan-interfax.ru/api/v1';

export const getUser = () => {
    let user = localStorage.getItem('accessToken');
    return user ? user : null;
}

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expire");
}

export const searchData = {
    startDate: '',
    endDate: '',
    inn: '',
    maxFullness: false,
    inBusinessNews: null,
    onlyMainRole: false,
    tonality: "any",
    onlyWithRiskFactors: false,
    limit: '',
    excludeTechNews: false,
    excludeAnnouncements: false,
    excludeDigests: false
}

