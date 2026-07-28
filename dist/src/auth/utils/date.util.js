"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDays = addDays;
exports.addMinutes = addMinutes;
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60 * 1000);
}
//# sourceMappingURL=date.util.js.map