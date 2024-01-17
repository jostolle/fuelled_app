export function createDateStringFromToday() {
    const date = new Date(Date.now());
    return createDateStringFromDate(date);
}

export function createDateStringFromDate(dateInput) {
    const date = new Date(dateInput);
    // make sure it's 2 digit
    const month = date.getMonth()+1; // it's zero-based so +1
    const monthString = month < 10 ? "0"+month : month;
    const day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
    return "date_"+date.getFullYear()+monthString+day;
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


export function Comparator(a, b) {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
}

export const DataPrefixString = "date_";