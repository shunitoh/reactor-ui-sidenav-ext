/*globals require,module */
/* jshint -W097,esnext: true */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var IconTextSchemeMixin = function (_React$Component) {
    _inherits(IconTextSchemeMixin, _React$Component);

    function IconTextSchemeMixin() {
        _classCallCheck(this, IconTextSchemeMixin);

        return _possibleConstructorReturn(this, (IconTextSchemeMixin.__proto__ || Object.getPrototypeOf(IconTextSchemeMixin)).apply(this, arguments));
    }

    _createClass(IconTextSchemeMixin, [{
        key: "render",
        value: function render() {
            var contentEls = [],
                propsIcon = this.props.icon,
                propsText = this.props.words && this.props.words[this.props.text] ? this.props.words[this.props.text] : this.props.text,
                icon,
                text,
                style = this.props.style; //style= it = icon text, ti , text icon, tbi text below icon

            if (!style) {
                style = "it"; //icon, text
            }
            if (!propsIcon && this.props.nav) {
                propsIcon = this.props.nav.icon;
            }
            if (!propsText && this.props.nav) {
                if (this.props.words && this.props.words[this.props.nav.text]) {
                    propsText = this.props.words[this.props.nav.text];
                } else {
                    propsText = this.props.nav.text;
                }
            }
            var id = this.props.nav ? this.props.nav.id : this.props.id ? this.props.id : null;
            var optionByIcon = id ? { style: { paddingRight: 10 }, className: propsIcon, key: id + '-icon' } : { style: { paddingRight: 10 }, className: propsIcon };
            if (propsIcon) {
                icon = React.createElement("span", optionByIcon);
            }

            var optionByText = id ? { key: id + '-text' } : null;
            if (propsText) {
                text = React.createElement(
                    "span",
                    optionByText,
                    propsText
                );
            }

            if (style === "it") {
                if (icon) {
                    contentEls.push(icon);
                }
                if (text) {
                    contentEls.push(text);
                }
            }

            return React.createElement(
                "div",
                null,
                contentEls
            );
        }
    }]);

    return IconTextSchemeMixin;
}(React.Component);

exports.default = IconTextSchemeMixin;
;
module.exports = exports["default"];