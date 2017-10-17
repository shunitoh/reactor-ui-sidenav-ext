
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');

var React = require("react");
var IconTextSchemeMixin = require("./IconTextSchemeMixin");
var cn = require("classnames");

var isActive = function isActive(props) {
    return props.selected.id === props.id; // && props.selected.group === props.group;
};

/**
 * The Single ChildNav Element
 */

var ChildNav = function (_React$Component) {
    _inherits(ChildNav, _React$Component);

    function ChildNav(props) {
        _classCallCheck(this, ChildNav);

        var _this = _possibleConstructorReturn(this, (ChildNav.__proto__ || Object.getPrototypeOf(ChildNav)).call(this, props));

        _this.state = { active: isActive(_this.props) };
        return _this;
    }

    _createClass(ChildNav, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ active: isActive(nextProps) });
        }
    }, {
        key: "itemClicked",
        value: function itemClicked() {
            if (this.props.onClick) {
                this.props.onClick(this.props.id, this.props.options);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var classNames = cn("rui-child-nav-group-item", { "rui-snav-active": this.state.active });
            if (this.props.selectedId) {
                if (this.props.selectedId === this.props.id) {
                    classNames = cn("rui-child-nav-group-item", { "rui-snav-active": true });
                } else {
                    classNames = cn("rui-child-nav-group-item", { "rui-snav-active": false });
                }
            }
            return React.createElement(
                "div",
                { onClick: this.itemClicked.bind(this), className: classNames },
                React.createElement(IconTextSchemeMixin, this.props)
            );
        }
    }]);

    return ChildNav;
}(React.Component);

exports.default = ChildNav;


ChildNav.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
module.exports = exports["default"];