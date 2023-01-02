"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormatString = exports.dateFormatNumbers = exports.getDatesBetween = exports.compareTime = exports.calculateTime = exports.convertDate = exports.formatTime = exports.convertDayOfWeek = void 0;
const references_1 = require("./references");
const convertDayOfWeek = (date) => {
    return references_1.days[date.getDay()];
};
exports.convertDayOfWeek = convertDayOfWeek;
const formatTime = (time, with_seconds = false) => {
    let splitted_time = time.split(':'); // convert to array
    // fetch
    var hours = Number(splitted_time[0]);
    var minutes = Number(splitted_time[1]);
    // calculate
    var timeValue;
    if (hours > 0 && hours <= 12) {
        timeValue = "" + hours;
    }
    else if (hours > 12) {
        timeValue = "" + (hours - 12);
    }
    else if (hours == 0) {
        timeValue = "12";
    }
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes; // get minutes
    if (with_seconds) {
        var seconds = Number(time[2]);
        timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds; // get seconds
    }
    timeValue += (hours >= 12) ? " PM" : " AM"; // get AM/PM
    return timeValue;
};
exports.formatTime = formatTime;
const convertDate = (date) => {
    let now = new Date(date);
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let year = now.getFullYear();
    return { month, day, year };
};
exports.convertDate = convertDate;
const calculateTime = (from, to, from_day = '01', to_day = '01') => {
    if (!from || !to)
        return 0;
    let total = 0;
    let from_time = new Date(`01/${from_day}/2000 ` + from);
    let to_time = new Date(`01/${to_day}/2000 ` + to);
    let diff = ((to_time.getTime() - from_time.getTime()) / (1000 * 60 * 60));
    if (diff < 0 && from_day === '01')
        diff = 24 + diff;
    if (diff > 0)
        total += diff;
    return total;
};
exports.calculateTime = calculateTime;
const compareTime = (from, to) => {
    let from_time = new Date("01/01/2000 " + from);
    let to_time = new Date("01/01/2000 " + to);
    return from_time > to_time;
};
exports.compareTime = compareTime;
const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    // Strip hours minutes seconds etc.
    let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
    }
    return dates;
};
exports.getDatesBetween = getDatesBetween;
const dateFormatNumbers = (date) => {
    let now = new Date(date);
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let year = now.getFullYear();
    return `${month}/${day}/${year}`;
};
exports.dateFormatNumbers = dateFormatNumbers;
const dateFormatString = (date = new Date()) => {
    return `${date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })} ${date.toLocaleTimeString('en-US')}`;
};
exports.dateFormatString = dateFormatString;
//# sourceMappingURL=methods.js.map