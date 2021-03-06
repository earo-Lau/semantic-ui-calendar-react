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
var React = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var popupStyle = {
    padding: '0',
    filter: 'none',
};
var FormInputWithRef = /** @class */ (function (_super) {
    __extends(FormInputWithRef, _super);
    function FormInputWithRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormInputWithRef.prototype.render = function () {
        var _a = this.props, value = _a.value, clearable = _a.clearable, icon = _a.icon, clearIcon = _a.clearIcon, onClear = _a.onClear, innerRef = _a.innerRef, onFocus = _a.onFocus, onBlur = _a.onBlur, onMouseEnter = _a.onMouseEnter, rest = __rest(_a, ["value", "clearable", "icon", "clearIcon", "onClear", "innerRef", "onFocus", "onBlur", "onMouseEnter"]);
        var ClearIcon = _.isString(clearIcon) ?
            React.createElement(semantic_ui_react_1.Icon, { name: clearIcon, link: true, onClick: onClear }) :
            React.createElement(clearIcon.type, __assign({}, clearIcon.props, { link: true, onClick: onClear }));
        return (React.createElement(semantic_ui_react_1.Form.Input, __assign({ onFocus: onFocus, onBlur: onBlur, onClick: onFocus, onMouseEnter: onMouseEnter }, rest),
            value && clearable ?
                ClearIcon
                :
                    React.createElement(semantic_ui_react_1.Icon, { name: icon }),
            React.createElement("input", { ref: innerRef, value: value })));
    };
    return FormInputWithRef;
}(React.Component));
var InputView = /** @class */ (function (_super) {
    __extends(InputView, _super);
    function InputView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollListener = function () {
            var closePopup = _this.props.closePopup;
            closePopup();
        };
        return _this;
    }
    InputView.prototype.render = function () {
        var _this = this;
        var _a = this.props, render = _a.render, popupPosition = _a.popupPosition, inline = _a.inline, value = _a.value, closeOnMouseLeave = _a.closeOnMouseLeave, onChange = _a.onChange, onClear = _a.onClear, children = _a.children, inlineLabel = _a.inlineLabel, popupIsClosed = _a.popupIsClosed, mountNode = _a.mountNode, tabIndex = _a.tabIndex, onMount = _a.onMount, closePopup = _a.closePopup, openPopup = _a.openPopup, animation = _a.animation, duration = _a.duration, pickerWidth = _a.pickerWidth, pickerStyle = _a.pickerStyle, rest = __rest(_a, ["render", "popupPosition", "inline", "value", "closeOnMouseLeave", "onChange", "onClear", "children", "inlineLabel", "popupIsClosed", "mountNode", "tabIndex", "onMount", "closePopup", "openPopup", "animation", "duration", "pickerWidth", "pickerStyle"]);
        var onBlur = function (e) {
            if (e.relatedTarget !== _this.popupNode && e.relatedTarget !== _this.inputNode) {
                closePopup();
            }
        };
        var onMouseLeave = function (e) {
            if (e.relatedTarget !== _this.popupNode && e.relatedTarget !== _this.inputNode) {
                if (closeOnMouseLeave) {
                    _this.mouseLeaveTimeout = window.setTimeout(function () {
                        if (_this.mouseLeaveTimeout) {
                            closePopup();
                        }
                    }, 500);
                }
            }
        };
        var onMouseEnter = function (e) {
            if (e.currentTarget === _this.popupNode || e.currentTarget === _this.inputNode) {
                if (closeOnMouseLeave) {
                    clearTimeout(_this.mouseLeaveTimeout);
                    _this.mouseLeaveTimeout = null;
                }
            }
        };
        var inputElement = (React.createElement(FormInputWithRef, __assign({}, rest, { innerRef: function (e) { _this.inputNode = e; onMount(e); }, value: value, tabIndex: tabIndex, inline: inlineLabel, onClear: function (e) { return (onClear || onChange)(e, __assign({}, rest, { value: '' })); }, onFocus: function (e) {
                _.invoke(_this.props, 'onFocus', e, _this.props);
                openPopup();
            }, onBlur: onBlur, onMouseEnter: onMouseEnter, onChange: onChange })));
        if (inline) {
            return render({
                tabIndex: tabIndex,
                pickerWidth: pickerWidth,
                pickerStyle: pickerStyle,
            });
        }
        return (React.createElement("div", null,
            inputElement,
            React.createElement(semantic_ui_react_1.Transition, { unmountOnHide: true, mountOnShow: true, visible: !popupIsClosed, animation: animation, duration: duration, onComplete: function () {
                    if (popupIsClosed) {
                        _this.unsetScrollListener();
                        // TODO: for some reason sometimes transition component
                        // doesn't hide even though `popupIsClosed === true`
                        // To hide it we need to rerender component
                        _this.forceUpdate();
                    }
                    else {
                        _this.setScrollListener();
                    }
                } },
                React.createElement(semantic_ui_react_1.Popup, { position: popupPosition, open: true, hoverable: closeOnMouseLeave, flowing: true, style: popupStyle, context: this.inputNode, on: 'hover' },
                    React.createElement("div", { onBlur: onBlur, onMouseLeave: onMouseLeave, onMouseEnter: onMouseEnter, style: { outline: 'none' }, tabIndex: 0, ref: function (ref) { return _this.popupNode = ref; } }, render({ pickerWidth: pickerWidth, pickerStyle: pickerStyle }))))));
    };
    InputView.prototype.setScrollListener = function () {
        window.addEventListener('scroll', this.scrollListener);
    };
    InputView.prototype.unsetScrollListener = function () {
        window.removeEventListener('scroll', this.scrollListener);
    };
    InputView.defaultProps = {
        inline: false,
        closeOnMouseLeave: true,
        tabIndex: '0',
        clearable: false,
        icon: 'calendar',
        clearIcon: 'remove',
        animation: 'scale',
        duration: 200,
    };
    return InputView;
}(React.Component));
exports.default = InputView;
