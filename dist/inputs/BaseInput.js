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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var BaseInput = /** @class */ (function (_super) {
    __extends(BaseInput, _super);
    function BaseInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.closePopup = function () {
            _this.setState({ popupIsClosed: true });
        };
        _this.openPopup = function () {
            _this.setState({ popupIsClosed: false });
        };
        _this.isPickerInFocus = function () {
            return document.activeElement === _this.calendarNode;
        };
        _this.isTriggerInFocus = function () {
            return document.activeElement === _this.inputNode;
        };
        _this.onModeSwitch = function () {
            // when using keyboard for selecting values on inline calendar
            // and when mode switches, picker looses focus.
            // In order to preserve focus on active picker
            // we call focus() on `calendarNode`.
            // `calendarNode` goes from *View component via
            // `this.onCalendarViewMount` callback
            if (_this.props.inline
                && !_this.isPickerInFocus()
                && _this.calendarNode) {
                _this.calendarNode.focus();
            }
        };
        _this.onCalendarViewMount = function (calendarNode) {
            _this.calendarNode = calendarNode;
        };
        _this.onInputViewMount = function (inputNode) {
            _this.inputNode = inputNode;
        };
        return _this;
    }
    BaseInput.defaultProps = {
        inline: false,
    };
    return BaseInput;
}(React.Component));
exports.default = BaseInput;
