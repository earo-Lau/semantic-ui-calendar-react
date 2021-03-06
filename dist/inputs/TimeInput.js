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
var lib_1 = require("../lib");
var HourPicker_1 = require("../pickers/timePicker/HourPicker");
var MinutePicker_1 = require("../pickers/timePicker/MinutePicker");
var InputView_1 = require("../views/InputView");
var BaseInput_1 = require("./BaseInput");
var parse_1 = require("./parse");
function getNextMode(currentMode) {
    if (currentMode === 'hour') {
        return 'minute';
    }
    return 'hour';
}
var TimeInput = /** @class */ (function (_super) {
    __extends(TimeInput, _super);
    function TimeInput(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSelect = function (e, _a) {
            var value = _a.value;
            lib_1.tick(_this.handleSelectUndelayed, e, { value: value });
        };
        _this.handleSelectUndelayed = function (e, _a) {
            var value = _a.value;
            var hour = value.hour, minute = value.minute;
            var _b = _this.props, timeFormat = _b.timeFormat, disableMinute = _b.disableMinute;
            var outputTimeString = '';
            if (_this.state.mode === 'hour' && !_.isNil(hour)) {
                outputTimeString = moment({ hour: hour }).format(parse_1.TIME_FORMAT[timeFormat]);
            }
            else if (!_.isNil(hour) && !_.isNil(minute)) {
                outputTimeString = moment({ hour: hour, minute: minute }).format(parse_1.TIME_FORMAT[timeFormat]);
            }
            _.invoke(_this.props, 'onChange', e, __assign({}, _this.props, { value: outputTimeString }));
            if (_this.props.closable && _this.state.mode === 'minute') {
                _this.closePopup();
            }
            if (!disableMinute) {
                _this.switchToNextMode();
            }
        };
        _this.switchToNextMode = function () {
            _this.setState(function (_a) {
                var mode = _a.mode;
                return { mode: getNextMode(mode) };
            }, _this.onModeSwitch);
        };
        _this.state = {
            mode: 'hour',
            popupIsClosed: true,
        };
        return _this;
    }
    TimeInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, timeFormat = _a.timeFormat, closable = _a.closable, disableMinute = _a.disableMinute, rest = __rest(_a, ["value", "timeFormat", "closable", "disableMinute"]);
        return (React.createElement(InputView_1.default, __assign({ popupIsClosed: this.state.popupIsClosed, onMount: this.onInputViewMount, closePopup: this.closePopup, openPopup: this.openPopup }, rest, { value: value, render: function (pickerProps) { return _this.getPicker(pickerProps); } })));
    };
    TimeInput.prototype.getPicker = function (_a) {
        var tabIndex = _a.tabIndex, pickerWidth = _a.pickerWidth, pickerStyle = _a.pickerStyle;
        var _b = this.props, value = _b.value, timeFormat = _b.timeFormat, inline = _b.inline;
        var currentValue = parse_1.parseValue(value, parse_1.TIME_FORMAT[timeFormat]);
        var pickerProps = {
            inline: inline,
            onCalendarViewMount: this.onCalendarViewMount,
            isPickerInFocus: this.isPickerInFocus,
            isTriggerInFocus: this.isTriggerInFocus,
            hasHeader: false,
            pickerWidth: pickerWidth,
            pickerStyle: pickerStyle,
            onHeaderClick: function () { return undefined; },
            closePopup: this.closePopup,
            initializeWith: parse_1.getInitializer({ initialDate: currentValue, dateFormat: parse_1.TIME_FORMAT[timeFormat] }),
            value: currentValue,
            onChange: this.handleSelect,
            timeFormat: timeFormat,
            tabIndex: tabIndex,
        };
        if (this.state.mode === 'hour') {
            return React.createElement(HourPicker_1.default, __assign({}, pickerProps));
        }
        return React.createElement(MinutePicker_1.default, __assign({}, pickerProps));
    };
    /**
     * Component responsibility:
     *  - parse time input string
     *  - switch between modes ['hour', 'minute']
     *  - handle HourPicker/MinutePicker change (format { hour: number, minute: number } into output time string)
     */
    TimeInput.defaultProps = {
        icon: 'time',
        timeFormat: '24',
        disableMinute: false,
        inline: false,
    };
    TimeInput.propTypes = {
        /** Currently selected value. */
        value: PropTypes.string,
        /** One of ["24", "AMPM", "ampm"] */
        timeFormat: PropTypes.oneOf([
            '24', 'AMPM', 'ampm',
        ]),
        /** If true, popup closes after selecting a date-time. */
        closable: PropTypes.bool,
        /** If true, minutes picker won't be shown after picking the hour. */
        disableMinute: PropTypes.bool,
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
    return TimeInput;
}(BaseInput_1.default));
exports.default = TimeInput;
