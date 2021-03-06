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
var PropTypes = require("prop-types");
var React = require("react");
var CustomPropTypes_1 = require("../lib/CustomPropTypes");
var DayPicker_1 = require("../pickers/dayPicker/DayPicker");
var MonthPicker_1 = require("../pickers/monthPicker/MonthPicker");
var HourPicker_1 = require("../pickers/timePicker/HourPicker");
var MinutePicker_1 = require("../pickers/timePicker/MinutePicker");
var YearPicker_1 = require("../pickers/YearPicker");
var InputView_1 = require("../views/InputView");
var BaseInput_1 = require("./BaseInput");
var lib_1 = require("../lib");
var parse_1 = require("./parse");
var shared_1 = require("./shared");
var nextMode = {
    year: 'month',
    month: 'day',
    day: 'hour',
    hour: 'minute',
    minute: 'year',
};
function getNextMode(currentMode) {
    return nextMode[currentMode];
}
var prevMode = {
    minute: 'hour',
    hour: 'day',
    day: 'month',
    month: 'year',
    year: 'minute',
};
function getPrevMode(currentMode) {
    return prevMode[currentMode];
}
var DateTimeInput = /** @class */ (function (_super) {
    __extends(DateTimeInput, _super);
    function DateTimeInput(props) {
        var _this = _super.call(this, props) || this;
        _this.switchToNextModeUndelayed = function () {
            _this.setState(function (_a) {
                var mode = _a.mode;
                return { mode: getNextMode(mode) };
            }, _this.onModeSwitch);
        };
        _this.switchToNextMode = function () {
            lib_1.tick(_this.switchToNextModeUndelayed);
        };
        _this.switchToPrevModeUndelayed = function () {
            _this.setState(function (_a) {
                var mode = _a.mode;
                return { mode: getPrevMode(mode) };
            }, _this.onModeSwitch);
        };
        _this.switchToPrevMode = function () {
            lib_1.tick(_this.switchToPrevModeUndelayed);
        };
        _this.handleSelect = function (e, _a) {
            var value = _a.value;
            lib_1.tick(_this.handleSelectUndelayed, e, { value: value });
        };
        _this.onFocus = function () {
            if (!_this.props.preserveViewMode) {
                _this.setState({ mode: _this.props.startMode });
            }
        };
        _this.handleSelectUndelayed = function (e, _a) {
            var value = _a.value;
            if (_this.props.closable && _this.state.mode === 'minute') {
                _this.closePopup();
            }
            _this.setState(function (prevState) {
                var mode = prevState.mode;
                if (mode === 'minute') {
                    var outValue = moment(value).format(_this.getDateTimeFormat());
                    _.invoke(_this.props, 'onChange', e, __assign({}, _this.props, { value: outValue }));
                }
                return {
                    year: value.year,
                    month: value.month,
                    date: value.date,
                    hour: value.hour,
                    minute: value.minute,
                };
            }, function () { return _this.state.mode !== 'minute' && _this.switchToNextMode(); });
        };
        var parsedValue = parse_1.parseValue(props.value, props.dateFormat);
        _this.state = {
            mode: props.startMode,
            year: parsedValue ? parsedValue.year() : undefined,
            month: parsedValue ? parsedValue.month() : undefined,
            date: parsedValue ? parsedValue.date() : undefined,
            hour: parsedValue ? parsedValue.hour() : undefined,
            minute: parsedValue ? parsedValue.minute() : undefined,
            popupIsClosed: true,
        };
        return _this;
    }
    DateTimeInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, dateTimeFormat = _a.dateTimeFormat, dateFormat = _a.dateFormat, timeFormat = _a.timeFormat, initialDate = _a.initialDate, disable = _a.disable, maxDate = _a.maxDate, minDate = _a.minDate, preserveViewMode = _a.preserveViewMode, startMode = _a.startMode, divider = _a.divider, closable = _a.closable, icon = _a.icon, rest = __rest(_a, ["value", "dateTimeFormat", "dateFormat", "timeFormat", "initialDate", "disable", "maxDate", "minDate", "preserveViewMode", "startMode", "divider", "closable", "icon"]);
        return (React.createElement(InputView_1.default, __assign({ popupIsClosed: this.state.popupIsClosed, icon: _.isBoolean(icon) && !icon ? undefined : icon, closePopup: this.closePopup, openPopup: this.openPopup, onFocus: this.onFocus, onMount: this.onInputViewMount }, rest, { value: value, render: function (pickerProps) { return _this.getPicker(pickerProps); } })));
    };
    DateTimeInput.prototype.getDateParams = function () {
        /*
          Return date params that are used for picker initialization.
          Return undefined if none of [ 'year', 'month', 'date', 'hour', 'minute' ]
          state fields defined.
        */
        var _a = this.state, year = _a.year, month = _a.month, date = _a.date, hour = _a.hour, minute = _a.minute;
        if (!_.isNil(year)
            || !_.isNil(month)
            || !_.isNil(date)
            || !_.isNil(hour)
            || !_.isNil(minute)) {
            return { year: year, month: month, date: date, hour: hour, minute: minute };
        }
    };
    DateTimeInput.prototype.getDateTimeFormat = function () {
        var _a = this.props, dateFormat = _a.dateFormat, divider = _a.divider, timeFormat = _a.timeFormat, dateTimeFormat = _a.dateTimeFormat;
        return dateTimeFormat || "" + dateFormat + divider + parse_1.TIME_FORMAT[timeFormat];
    };
    DateTimeInput.prototype.getPicker = function (_a) {
        var tabIndex = _a.tabIndex, pickerWidth = _a.pickerWidth, pickerStyle = _a.pickerStyle;
        var _b = this.props, value = _b.value, initialDate = _b.initialDate, dateFormat = _b.dateFormat, disable = _b.disable, minDate = _b.minDate, maxDate = _b.maxDate, inline = _b.inline;
        var dateTimeFormat = this.getDateTimeFormat();
        var pickerProps = {
            tabIndex: tabIndex,
            isPickerInFocus: this.isPickerInFocus,
            isTriggerInFocus: this.isTriggerInFocus,
            inline: inline,
            pickerWidth: pickerWidth,
            pickerStyle: pickerStyle,
            onCalendarViewMount: this.onCalendarViewMount,
            closePopup: this.closePopup,
            onChange: this.handleSelect,
            onHeaderClick: this.switchToPrevMode,
            initializeWith: parse_1.getInitializer({ initialDate: initialDate, dateFormat: dateTimeFormat, dateParams: this.getDateParams() }),
            value: parse_1.parseValue(parse_1.chooseValue(value, initialDate), dateTimeFormat),
            minDate: parse_1.parseValue(minDate, dateFormat),
            maxDate: parse_1.parseValue(maxDate, dateFormat),
        };
        var disableParsed = parse_1.parseArrayOrValue(disable, dateFormat);
        var mode = this.state.mode;
        if (mode === 'year') {
            return (React.createElement(YearPicker_1.default, __assign({}, pickerProps, { disable: shared_1.getDisabledYears(disableParsed) })));
        }
        if (mode === 'month') {
            return (React.createElement(MonthPicker_1.default, __assign({}, pickerProps, { hasHeader: true, disable: shared_1.getDisabledMonths(disableParsed) })));
        }
        if (mode === 'day') {
            return (React.createElement(DayPicker_1.default, __assign({}, pickerProps, { disable: disableParsed })));
        }
        if (mode === 'hour') {
            return (React.createElement(HourPicker_1.default, __assign({ timeFormat: this.props.timeFormat, hasHeader: true }, pickerProps, { disable: disableParsed })));
        }
        return (React.createElement(MinutePicker_1.default, __assign({ timeFormat: this.props.timeFormat, hasHeader: true }, pickerProps, { disable: disableParsed })));
    };
    /**
     * Component responsibility:
     *  - parse input value
     *  - handle underlying picker change
     */
    DateTimeInput.defaultProps = {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: '24',
        startMode: 'day',
        divider: ' ',
        icon: 'calendar',
        preserveViewMode: true,
        inline: false,
    };
    DateTimeInput.propTypes = {
        /** Currently selected value. */
        value: PropTypes.string,
        /** Moment datetime formatting string */
        dateTimeFormat: PropTypes.string,
        /** Moment date formatting string. */
        dateFormat: PropTypes.string,
        /** Time format ["AMPM", "ampm", "24"] */
        timeFormat: PropTypes.string,
        /** Date to display initially when no date is selected. */
        initialDate: PropTypes.oneOfType([
            PropTypes.string,
            CustomPropTypes_1.default.momentObj,
            PropTypes.instanceOf(Date),
        ]),
        /** Date or list of dates that are displayed as disabled. */
        disable: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
            CustomPropTypes_1.default.momentObj,
            PropTypes.arrayOf(CustomPropTypes_1.default.momentObj),
            PropTypes.instanceOf(Date),
            PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        ]),
        /** Maximum date that can be selected. */
        maxDate: PropTypes.oneOfType([
            PropTypes.string,
            CustomPropTypes_1.default.momentObj,
            PropTypes.instanceOf(Date),
        ]),
        /** Minimum date that can be selected. */
        minDate: PropTypes.oneOfType([
            PropTypes.string,
            CustomPropTypes_1.default.momentObj,
            PropTypes.instanceOf(Date),
        ]),
        /** Preserve viewmode on focus? */
        preserveViewMode: PropTypes.bool,
        /** Display mode to start. */
        startMode: PropTypes.oneOf([
            'year', 'month', 'day',
        ]),
        /** Date and time divider. */
        divider: PropTypes.string,
        /** If true, popup closes after selecting a date-time. */
        closable: PropTypes.bool,
        /**
         * Called on clear.
         *
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {object} data - All props and proposed value.
         */
        onClear: PropTypes.func,
        /** Using the clearable setting will let users remove their selection from a calendar. */
        clearable: PropTypes.bool,
        /** Optional Icon to display inside the clearable Input. */
        clearIcon: PropTypes.any,
        /** Duration of the CSS transition animation in milliseconds. */
        duration: PropTypes.number,
        /** Named animation event to used. Must be defined in CSS. */
        animation: PropTypes.string,
    };
    return DateTimeInput;
}(BaseInput_1.default));
exports.default = DateTimeInput;
