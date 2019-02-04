"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var moment = require("moment");
var MonthPicker_1 = require("./MonthPicker");
var buildCalendarValues = function () {
    /*
      Return array of months (strings) like ['Aug', 'Sep', ...]
      that used to populate calendar's page.
    */
    return moment.monthsShort();
};
exports.buildCalendarValues = buildCalendarValues;
var getInitialDatePosition = function (selectable, currentDate) {
    if (selectable.indexOf(currentDate.month()) < 0) {
        return selectable[0];
    }
    return currentDate.month();
};
exports.getInitialDatePosition = getInitialDatePosition;
var getDisabledPositions = function (enable, disable, maxDate, minDate, currentDate) {
    /*
      Return position numbers of months that should be displayed as disabled
      (position in array returned by `this.buildCalendarValues`).
    */
    var disabled = [];
    if (_.isArray(enable)) {
        var enabledMonthPositions_1 = enable
            .filter(function (monthMoment) { return monthMoment.isSame(currentDate, 'year'); })
            .map(function (monthMoment) { return monthMoment.month(); });
        disabled = disabled.concat(_.range(0, MonthPicker_1.MONTHS_IN_YEAR)
            .filter(function (monthPosition) { return !_.includes(enabledMonthPositions_1, monthPosition); }));
    }
    if (_.isArray(disable)) {
        disabled = disabled.concat(disable
            .filter(function (monthMoment) { return monthMoment.year() === currentDate.year(); })
            .map(function (monthMoment) { return monthMoment.month(); }));
    }
    if (!_.isNil(maxDate)) {
        if (maxDate.year() === currentDate.year()) {
            disabled = disabled.concat(_.range(maxDate.month() + 1, MonthPicker_1.MONTHS_IN_YEAR));
        }
        if (maxDate.year() < currentDate.year()) {
            disabled = _.range(0, MonthPicker_1.MONTHS_IN_YEAR);
        }
    }
    if (!_.isNil(minDate)) {
        if (minDate.year() === currentDate.year()) {
            disabled = disabled.concat(_.range(0, minDate.month()));
        }
        if (minDate.year() > currentDate.year()) {
            disabled = _.range(0, MonthPicker_1.MONTHS_IN_YEAR);
        }
    }
    if (disabled.length > 0) {
        return _.uniq(disabled);
    }
};
exports.getDisabledPositions = getDisabledPositions;
var isNextPageAvailable = function (maxDate, enable, currentDate) {
    if (_.isArray(enable)) {
        return _.some(enable, function (enabledMonth) { return enabledMonth.isAfter(currentDate, 'year'); });
    }
    if (_.isNil(maxDate)) {
        return true;
    }
    return currentDate.year() < maxDate.year();
};
exports.isNextPageAvailable = isNextPageAvailable;
var isPrevPageAvailable = function (minDate, enable, currentDate) {
    if (_.isArray(enable)) {
        return _.some(enable, function (enabledMonth) { return enabledMonth.isBefore(currentDate, 'year'); });
    }
    if (_.isNil(minDate)) {
        return true;
    }
    return currentDate.year() > minDate.year();
};
exports.isPrevPageAvailable = isPrevPageAvailable;
