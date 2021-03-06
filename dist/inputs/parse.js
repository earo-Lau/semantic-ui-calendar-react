"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var moment = require("moment");
exports.TIME_FORMAT = {
    24: 'HH:mm',
    AMPM: 'hh:mm A',
    ampm: 'hh:mm a',
};
/** Parse string, moment, Date.
 *
 * Return unedfined on invalid input.
 */
function parseValue(value, dateFormat) {
    if (!_.isNil(value) && !_.isNil(dateFormat)) {
        var date = moment(value, dateFormat);
        if (date.isValid()) {
            return date;
        }
    }
}
exports.parseValue = parseValue;
/** Parse string, moment, Date, string[], moment[], Date[].
 *
 * Return array of moments. Returned value contains only valid moments.
 * Return undefined if none of the input values are valid.
 */
function parseArrayOrValue(data, dateFormat) {
    if (_.isArray(data)) {
        var parsed = _.compact(data.map(function (item) { return parseValue(item, dateFormat); }));
        if (parsed.length > 0) {
            return parsed;
        }
    }
    var parsedValue = parseValue(data, dateFormat);
    return parsedValue && [parsedValue];
}
exports.parseArrayOrValue = parseArrayOrValue;
/** Create moment.
 *
 * Creates moment using `dateParams` or `initialDate` arguments (if provided).
 * Precedense order: dateParams -> initialDate -> default value
 */
function getInitializer(context) {
    var dateParams = context.dateParams, initialDate = context.initialDate, dateFormat = context.dateFormat;
    if (dateParams) {
        var parsedParams = moment(dateParams);
        if (parsedParams.isValid()) {
            return parsedParams;
        }
    }
    var parsedInitialDate = parseValue(initialDate, dateFormat);
    if (parsedInitialDate) {
        return parsedInitialDate;
    }
    return moment();
}
exports.getInitializer = getInitializer;
/** Return initial date if `value` is empty and if `initialDate` provided. */
function chooseValue(value, initialDate) {
    if (value === '' && initialDate) {
        return initialDate;
    }
    return value;
}
exports.chooseValue = chooseValue;
function dateValueToString(value, dateFormat) {
    if (_.isString(value)) {
        return value;
    }
    if (moment.isMoment(value)) {
        return value.format(dateFormat);
    }
    return moment(value, dateFormat).format(dateFormat);
}
exports.dateValueToString = dateValueToString;
function cleanDate(inputString, dateFormat) {
    var formattedDateLength = moment().format(dateFormat).length;
    return inputString.trim().slice(0, formattedDateLength);
}
/**
 * Extract start and end dates from input string.
 * Return { start: Moment|undefined, end: Moment|undefined }
 * @param {string} inputString Row input string from user
 * @param {string} dateFormat Moment formatting string
 * @param {string} inputSeparator Separator for split inputString
 */
function parseDatesRange(inputString, dateFormat, inputSeparator) {
    if (inputString === void 0) { inputString = ''; }
    if (dateFormat === void 0) { dateFormat = ''; }
    if (inputSeparator === void 0) { inputSeparator = ' - '; }
    var dates = inputString.split(inputSeparator)
        .map(function (date) { return cleanDate(date, dateFormat); });
    var result = {};
    var start;
    var end;
    start = moment(dates[0], dateFormat);
    if (dates.length === 2) {
        end = moment(dates[1], dateFormat);
    }
    if (start && start.isValid()) {
        result.start = start;
    }
    if (end && end.isValid()) {
        result.end = end;
    }
    return result;
}
exports.parseDatesRange = parseDatesRange;
