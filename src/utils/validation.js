export const errMessage = 'Введите корректные данные';

export function validateInn(inn) {
	var result = false;
    let error = '';
	if (typeof inn === 'number') {
		inn = inn.toString();
	} else if (typeof inn !== 'string') {
		inn = '';
	}
	if (!inn.length) {
		error = 'ИНН пуст';
	} else if (/[^0-9]/.test(inn)) {
		error = 'ИНН может состоять только из цифр';
	} else if ([10, 12].indexOf(inn.length) === -1) {
		error = 'ИНН может состоять только из 10 или 12 цифр';
	} else {
		var checkDigit = function (inn, coefficients) {
			var n = 0;
			for (var i in coefficients) {
				n += coefficients[i] * inn[i];
			}
			return parseInt(n % 11 % 10);
		};
		switch (inn.length) {
			case 10:
				var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if (n10 === parseInt(inn[9])) {
					result = true;
				}
				break;
			case 12:
				var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
					result = true;
				}
				break;
		}
	}
	return !result && inn !== '';
}

export const validateLimit = (value) => {
    if (isNaN(value)) {
        return true;
    } else {
       return (value > 1000 || value < 1) && value !== '';
    }
}

export const validateDates = (startDate, endDate) => {
    const today = new Date();
    if (!startDate || !endDate) {
        return false;
    }
    return (
        startDate > today ||
        endDate > today ||
        startDate > endDate ||
        endDate < startDate
    );
};