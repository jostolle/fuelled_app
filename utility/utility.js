export function createDateStringFromToday() {
    const date = new Date(Date.now());
    return ""+date.getFullYear()+date.getMonth()+date.getDate();
}

export function createDateStringFromDate(dateInput) {
    const date = new Date(dateInput);
    return ""+date.getFullYear()+date.getMonth()+date.getDate();
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}