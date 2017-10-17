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

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var React = require("react");
var Nav = require("./ChildNav");
var IconTextSchemeMixin = require("./IconTextSchemeMixin");
var cn = require("classnames");
var existCheckByNavId = function existCheckByNavId(parent, searchKey) {
    if (parent && parent.id === searchKey) {
        return true;
    }
    if (parent && parent.navlist) {
        var l = parent.navlist.length;
        var child = null;
        for (var i = 0; i < l; ++i) {
            child = parent.navlist[i];

            if (existCheckByNavId(child, searchKey)) {
                return true;
            }
        }
    }
};

var isActive = function isActive(props) {
    var res = existCheckByNavId(props.nav, props.selected.id);
    return res;
};

var ChildNavGroup = function (_React$Component) {
    _inherits(ChildNavGroup, _React$Component);

    function ChildNavGroup(props) {
        _classCallCheck(this, ChildNavGroup);

        var _this2 = _possibleConstructorReturn(this, (ChildNavGroup.__proto__ || Object.getPrototypeOf(ChildNavGroup)).call(this, props));

        _this2.state = { collapsed: false, selected: _this2.props.selected, active: false };
        return _this2;
    }

    _createClass(ChildNavGroup, [{
        key: "buildChildren",
        value: function buildChildren() {
            var _this = this;

            if (this.props.nav) {
                return this.props.nav.navlist.map(function (nav) {
                    if (nav.active === false) {
                        return;
                    }
                    return React.createElement(Nav, _extends({ key: nav.id, selectedId: _this.props.selectedId, selected: _this.state.selected, onClick: _this.onSubNavClick.bind(_this), words: _this.props.words }, nav));
                });
            } else {
                return this.props.children;
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ selected: nextProps.selected, active: isActive(nextProps) });
        }

        /**
         *  The ID of this would be this.props.id/the clicked nav id
         */

    }, {
        key: "onSubNavClick",
        value: function onSubNavClick(id, options) {
            if (this.props.onClick) {
                this.props.onClick(this.props.nav.id, id, options);
            }
        }
    }, {
        key: "onClick",
        value: function onClick() {
            if (this.props.anotherAction) {
                this.props.anotherAction(this.props.nav.id, this.props.nav.options);
            }
            this.setState({ collapsed: !this.state.collapsed });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            //we cant transition 0 height to auto height.. so below is the result
            if (this.props.selectedId) {
                this.setState({ collapsed: !this.state.collapsed });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var itemsClassnames = cn("rui-snav-items");
            var groupclassName = cn("rui-snav-cgrp", { "rui-snav-child-active": this.state.active });
            var groupclassNameByClicked = cn("rui-snav-cgrp-c", { "rui-snav-cgrp-c-active": this.state.active });
            var style = {};
            if (this.state.collapsed) {
                style["height"] = 'auto';
            } else {
                style["height"] = 0;
            }

            if (!existCheckByNavId(this.props.nav, this.props.selected.id)) {
                style["height"] = 0;
            }

            if (this.props.selectedId) {
                style["height"] = 'auto';
                if (existCheckByNavId(this.props.nav, this.props.selectedId)) {
                    groupclassName = cn("rui-snav-cgrp", { "rui-snav-child-active": true });
                } else {
                    groupclassName = cn("rui-snav-cgrp", { "rui-snav-child-active": false });
                    style["height"] = 0;
                }
            }

            return React.createElement(
                "div",
                { className: groupclassNameByClicked, key: this.props.nav.id },
                React.createElement(
                    "div",
                    {
                        onClick: this.onClick.bind(this),
                        className: groupclassName,
                        key: this.props.nav.id + '-group' },
                    React.createElement(IconTextSchemeMixin, this.props)
                ),
                React.createElement(
                    "div",
                    {
                        ref: "cont",
                        style: style,
                        className: itemsClassnames,
                        key: this.props.nav.id + '-items' },
                    this.buildChildren()
                )
            );
        }
    }]);

    return ChildNavGroup;
}(React.Component);

exports.default = ChildNavGroup;
module.exports = exports["default"];