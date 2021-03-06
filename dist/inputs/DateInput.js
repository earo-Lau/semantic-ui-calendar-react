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
var YearPicker_1 = require("../pickers/YearPicker");
var InputView_1 = require("../views/InputView");
var BaseInput_1 = require("./BaseInput");
var lib_1 = require("../lib");
var parse_1 = require("./parse");
var shared_1 = require("./shared");
function getNextMode(currentMode) {
    if (currentMode === 'year') {
        return 'month';
    }
    if (currentMode === 'month') {
        return 'day';
    }
    return 'year';
}
function getPrevMode(currentMode) {
    if (currentMode === 'day') {
        return 'month';
    }
    if (currentMode === 'month') {
        return 'year';
    }
    return 'day';
}
var DateInput = /** @class */ (function (_super) {
    __extends(DateInput, _super);
    function DateInput(props) {
        var _this = _super.call(this, props) || this;
        _this.getPicker = function (_a) {
            var tabIndex = _a.tabIndex, pickerWidth = _a.pickerWidth, pickerStyle = _a.pickerStyle;
            var _b = _this.props, value = _b.value, initialDate = _b.initialDate, dateFormat = _b.dateFormat, disable = _b.disable, minDate = _b.minDate, maxDate = _b.maxDate, enable = _b.enable, inline = _b.inline;
            var pickerProps = {
                isPickerInFocus: _this.isPickerInFocus,
                isTriggerInFocus: _this.isTriggerInFocus,
                inline: inline,
                onCalendarViewMount: _this.onCalendarViewMount,
                closePopup: _this.closePopup,
                tabIndex: tabIndex,
                pickerWidth: pickerWidth,
                pickerStyle: pickerStyle,
                onChange: _this.handleSelect,
                onHeaderClick: _this.switchToPrevMode,
                initializeWith: parse_1.getInitializer({ initialDate: initialDate, dateFormat: dateFormat, dateParams: _this.getDateParams() }),
                value: parse_1.parseValue(parse_1.chooseValue(value, initialDate), dateFormat),
                enable: parse_1.parseArrayOrValue(enable, dateFormat),
                minDate: parse_1.parseValue(minDate, dateFormat),
                maxDate: parse_1.parseValue(maxDate, dateFormat),
            };
            var disableParsed = parse_1.parseArrayOrValue(disable, dateFormat);
            var mode = _this.state.mode;
            if (mode === 'year') {
                return (React.createElement(YearPicker_1.default, __assign({}, pickerProps, { disable: shared_1.getDisabledYears(disableParsed) })));
            }
            if (mode === 'month') {
                return (React.createElement(MonthPicker_1.default, __assign({}, pickerProps, { hasHeader: true, disable: shared_1.getDisabledMonths(disableParsed) })));
            }
            return React.createElement(DayPicker_1.default, __assign({}, pickerProps, { disable: disableParsed }));
        };
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
        _this.onFocus = function () {
            if (!_this.props.preserveViewMode) {
                _this.setState({ mode: _this.props.startMode });
            }
        };
        _this.handleSelect = function (e, _a) {
            var value = _a.value;
            if (_this.state.mode === 'day' && _this.props.closable) {
                _this.closePopup();
            }
            _this.setState(function (prevState) {
                var mode = prevState.mode;
                if (mode === 'day') {
                    var outValue = moment(value).format(_this.props.dateFormat);
                    _.invoke(_this.props, 'onChange', e, __assign({}, _this.props, { value: outValue }));
                }
                return {
                    year: value.year,
                    month: value.month,
                    date: value.date,
                };
            }, function () { return _this.state.mode !== 'day' && _this.switchToNextMode(); });
        };
        var parsedValue = parse_1.parseValue(props.value, props.dateFormat);
        _this.state = {
            mode: props.startMode,
            popupIsClosed: true,
            year: parsedValue ? parsedValue.year() : undefined,
            month: parsedValue ? parsedValue.month() : undefined,
            date: parsedValue ? parsedValue.date() : undefined,
        };
        return _this;
    }
    DateInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, icon = _a.icon, dateFormat = _a.dateFormat, initialDate = _a.initialDate, disable = _a.disable, enable = _a.enable, maxDate = _a.maxDate, minDate = _a.minDate, preserveViewMode = _a.preserveViewMode, startMode = _a.startMode, closable = _a.closable, rest = __rest(_a, ["value", "icon", "dateFormat", "initialDate", "disable", "enable", "maxDate", "minDate", "preserveViewMode", "startMode", "closable"]);
        return (React.createElement(InputView_1.default, __assign({ closePopup: this.closePopup, openPopup: this.openPopup, popupIsClosed: this.state.popupIsClosed, onMount: this.onInputViewMount, icon: _.isBoolean(icon) && !icon ? undefined : icon, onFocus: this.onFocus }, rest, { render: function (props) { return _this.getPicker(props); }, value: parse_1.dateValueToString(parse_1.chooseValue(value, undefined), dateFormat) })));
    };
    DateInput.prototype.getDateParams = function () {
        /*
          Return date params that are used for picker initialization.
          Return undefined if none of [ 'year', 'month', 'date' ]
          state fields defined.
        */
        var _a = this.state, year = _a.year, month = _a.month, date = _a.date;
        if (!_.isNil(year) || !_.isNil(month) || !_.isNil(date)) {
            return { year: year, month: month, date: date };
        }
    };
    /**
     * Component responsibility:
     *  - parse input value
     *  - handle underlying picker change
     */
    DateInput.defaultProps = {
        dateFormat: 'DD-MM-YYYY',
        startMode: 'day',
        preserveViewMode: true,
        inline: false,
        icon: 'calendar',
    };
    DateInput.propTypes = {
        /** Currently selected value. */
        value: PropTypes.string.isRequired,
        /** Moment date formatting string. */
        dateFormat: PropTypes.string,
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
        /** Date or list of dates that are enabled (the rest are disabled). */
        enable: PropTypes.oneOfType([
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
    return DateInput;
}(BaseInput_1.default));
exports.default = DateInput;
