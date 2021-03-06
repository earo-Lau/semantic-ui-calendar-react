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
var moment = require("moment");
var PropTypes = require("prop-types");
var React = require("react");
var CustomPropTypes_1 = require("../lib/CustomPropTypes");
var YearPicker_1 = require("../pickers/YearPicker");
var InputView_1 = require("../views/InputView");
var BaseInput_1 = require("./BaseInput");
var parse_1 = require("./parse");
var YearInput = /** @class */ (function (_super) {
    __extends(YearInput, _super);
    function YearInput(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSelect = function (e, _a) {
            var value = _a.value;
            var date = moment({ year: value.year });
            var output = '';
            if (date.isValid()) {
                output = date.format(_this.props.dateFormat);
            }
            var data = __assign({}, _this.props, { value: output });
            _this.props.onChange(e, data);
            if (_this.props.closable) {
                _this.closePopup();
            }
        };
        _this.state = {
            popupIsClosed: true,
        };
        return _this;
    }
    YearInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, disable = _a.disable, maxDate = _a.maxDate, minDate = _a.minDate, initialDate = _a.initialDate, dateFormat = _a.dateFormat, closable = _a.closable, rest = __rest(_a, ["value", "disable", "maxDate", "minDate", "initialDate", "dateFormat", "closable"]);
        var initializeWith = parse_1.getInitializer({
            dateParams: { year: parseInt(value, 10) },
            initialDate: initialDate,
            dateFormat: dateFormat,
        });
        return (React.createElement(InputView_1.default, __assign({ popupIsClosed: this.state.popupIsClosed, closePopup: this.closePopup, openPopup: this.openPopup }, rest, { value: value, onMount: this.onInputViewMount, render: function (pickerProps) { return (React.createElement(YearPicker_1.default, __assign({}, pickerProps, { isPickerInFocus: _this.isPickerInFocus, isTriggerInFocus: _this.isTriggerInFocus, inline: _this.props.inline, onCalendarViewMount: _this.onCalendarViewMount, closePopup: _this.closePopup, onChange: _this.handleSelect, initializeWith: initializeWith, value: parse_1.parseValue(value, dateFormat), disable: parse_1.parseArrayOrValue(disable, dateFormat), maxDate: parse_1.parseValue(maxDate, dateFormat), minDate: parse_1.parseValue(minDate, dateFormat) }))); } })));
    };
    YearInput.defaultProps = {
        dateFormat: 'YYYY',
        inline: false,
        icon: 'calendar',
    };
    YearInput.propTypes = {
        /** Currently selected value. */
        value: PropTypes.string,
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
    return YearInput;
}(BaseInput_1.default));
exports.default = YearInput;
