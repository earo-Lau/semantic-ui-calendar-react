"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var moment = require("moment");
var React = require("react");
var MonthRangeView_1 = require("../../views/MonthRangeView");
var BasePicker_1 = require("../BasePicker");
var MonthPicker_1 = require("./MonthPicker");
var sharedFunctions_1 = require("./sharedFunctions");
var MonthRangePicker = /** @class */ (function (_super) {
    __extends(MonthRangePicker, _super);
    function MonthRangePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (e, _a) {
            var itemPosition = _a.itemPosition;
            // call `onChange` with value: { start: moment, end: moment }
            var _b = _this.props, start = _b.start, end = _b.end;
            var data = __assign({}, _this.props, { value: {} });
            if (_.isNil(start) && _.isNil(end)) {
                data.value = { start: moment({ year: _this.state.date.year(), month: itemPosition, date: 1 }) };
            }
            else if (!_.isNil(start) && _.isNil(end)) {
                data.value = {
                    start: start,
                    end: moment({ year: _this.state.date.year(), month: itemPosition, date: 1 }).endOf('month'),
                };
            }
            _this.props.onChange(e, data);
        };
        _this.switchToNextPage = function (e, data, callback) {
            _this.setState(function (_a) {
                var date = _a.date;
                var nextDate = date.clone();
                nextDate.add(1, 'month');
                return { date: nextDate };
            }, callback);
        };
        _this.switchToPrevPage = function (e, data, callback) {
            _this.setState(function (_a) {
                var date = _a.date;
                var prevDate = date.clone();
                prevDate.subtract(1, 'month');
                return { date: prevDate };
            }, callback);
        };
        _this.getInitialDatePosition = function () {
            var selectable = _this.getSelectableCellPositions();
            return sharedFunctions_1.getInitialDatePosition(selectable, _this.state.date);
        };
        _this.PAGE_WIDTH = MonthPicker_1.PAGE_WIDTH;
        return _this;
    }
    MonthRangePicker.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, value = _a.value, initializeWith = _a.initializeWith, closePopup = _a.closePopup, inline = _a.inline, isPickerInFocus = _a.isPickerInFocus, isTriggerInFocus = _a.isTriggerInFocus, onCalendarViewMount = _a.onCalendarViewMount, dateFormat = _a.dateFormat, start = _a.start, end = _a.end, minDate = _a.minDate, maxDate = _a.maxDate, rest = __rest(_a, ["onChange", "value", "initializeWith", "closePopup", "inline", "isPickerInFocus", "isTriggerInFocus", "onCalendarViewMount", "dateFormat", "start", "end", "minDate", "maxDate"]);
        return (React.createElement(MonthRangeView_1.default, __assign({}, rest, { values: sharedFunctions_1.buildCalendarValues(), onNextPageBtnClick: this.switchToNextPage, onPrevPageBtnClick: this.switchToPrevPage, onCellHover: this.onHoveredCellPositionChange, hoveredItemIndex: this.state.hoveredCellPosition, onValueClick: this.handleChange, inline: this.props.inline, hasPrevPage: this.isPrevPageAvailable(), hasNextPage: this.isNextPageAvailable(), onBlur: this.handleBlur, onMount: this.props.onCalendarViewMount, currentHeadingValue: this.getCurrentDate(), currentRangeHeadingValue: this.getSelectedRange(), activeRange: this.getActiveCellsPositions(), disabledItemIndexes: this.getDisabledPositions() })));
    };
    MonthRangePicker.prototype.getCurrentDate = function () {
        /* Return currently selected year and month(string) to display in calendar header. */
        return this.state.date.format('YYYY');
    };
    MonthRangePicker.prototype.buildCalendarValues = function () {
        return sharedFunctions_1.buildCalendarValues();
    };
    MonthRangePicker.prototype.getSelectableCellPositions = function () {
        var _this = this;
        return _.filter(_.range(0, MonthPicker_1.MONTHS_IN_YEAR), function (d) { return !_.includes(_this.getDisabledPositions(), d); });
    };
    MonthRangePicker.prototype.getActiveCellsPositions = function () {
        // TODO: get cell positions
        /*
          Return starting and ending positions of dates range that should be displayed as active
          { start: number, end: number }
          (position in array returned by `this.buildCalendarValues`).
        */
        return { start: undefined, end: undefined };
    };
    MonthRangePicker.prototype.getDisabledPositions = function () {
        /*
          Return position numbers of dates that should be displayed as disabled
          (position in array returned by `this.buildCalendarValues`).
        */
        var _a = this.props, maxDate = _a.maxDate, minDate = _a.minDate;
        return sharedFunctions_1.getDisabledPositions(undefined, undefined, maxDate, minDate, this.state.date);
    };
    MonthRangePicker.prototype.isNextPageAvailable = function () {
        var maxDate = this.props.maxDate;
        return sharedFunctions_1.isNextPageAvailable(maxDate, undefined, this.state.date);
    };
    MonthRangePicker.prototype.isPrevPageAvailable = function () {
        var minDate = this.props.minDate;
        return sharedFunctions_1.isPrevPageAvailable(minDate, undefined, this.state.date);
    };
    MonthRangePicker.prototype.getSelectedRange = function () {
        /* Return currently selected dates range(string) to display in calendar header. */
        var _a = this.props, start = _a.start, end = _a.end, dateFormat = _a.dateFormat;
        return (start ? start.format(dateFormat) : '- - -') + " - " + (end ? end.format(dateFormat) : '- - -');
    };
    return MonthRangePicker;
}(BasePicker_1.RangeSelectionPicker));
exports.default = MonthRangePicker;
