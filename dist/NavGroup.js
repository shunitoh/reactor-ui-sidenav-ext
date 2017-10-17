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
var lodash = require("lodash");
var Nav = require("./Nav");
var ChildNavGroup = require("./ChildNavGroup");
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
    var res = props.selected.group === props.nav.id && existCheckByNavId(props.nav, props.selected.id);
    return res;
};

var NavGroup = function (_React$Component) {
    _inherits(NavGroup, _React$Component);

    function NavGroup(props) {
        _classCallCheck(this, NavGroup);

        var _this2 = _possibleConstructorReturn(this, (NavGroup.__proto__ || Object.getPrototypeOf(NavGroup)).call(this, props));

        _this2.state = { collapsed: false, selected: _this2.props.selected, active: false };
        return _this2;
    }

    _createClass(NavGroup, [{
        key: "dispatchSelection",
        value: function dispatchSelection(selection) {
            if (this.props.onSelection) {
                this.props.onSelection(selection);
            }
        }
    }, {
        key: "buildChildren",
        value: function buildChildren() {
            var _this = this;
            if (this.props.nav) {
                return this.props.nav.navlist.map(function (nav) {
                    if (nav.active === false) {
                        return;
                    }
                    if (nav.navlist) {
                        return React.createElement(ChildNavGroup, {
                            key: nav.id,
                            selectedId: _this.props.selectedId,
                            selected: _this.state.selected,
                            onClick: _this.onChildNavClick.bind(_this),
                            anotherAction: _this.onSubNavClick.bind(_this),
                            nav: nav,
                            words: _this.props.words });
                    } else {
                        return React.createElement(Nav, _extends({ key: nav.id }, { selectedId: _this.props.selectedId }, { selected: _this.state.selected }, nav, { onClick: _this.onSubNavClick.bind(_this) }, { group: nav.id }, { words: _this.props.words }));
                    }
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
    }, {
        key: "onChildNavClick",
        value: function onChildNavClick(group, child, options) {
            if (this.props.onClick) {
                this.props.onClick(this.props.nav.id, child, options);
                var selection = { group: group, id: child, options: options };
                this.setState({ selected: selection });
            }
            //this.dispatchSelection(selection);
        }

        /**
         *  The ID of this would be this.props.id/the clicked nav id
         */

    }, {
        key: "onSubNavClick",
        value: function onSubNavClick(id, options) {
            if (this.props.onClick) {
                this.props.onClick(this.props.nav.id, id, options);
                var selection = { id: id, options: options };
                this.setState({ selected: selection });
            }
        }
    }, {
        key: "onClick",
        value: function onClick() {
            if (lodash.has(this.props, 'anotherAction')) {
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
            var style = {};
            var itemsClassnames = cn("rui-snav-items");
            var groupclassName = cn("rui-snav-grp", { "rui-snav-active": this.state.active });
            var groupclassNameByClicked = cn("rui-snav-grp-c", { "rui-snav-grp-c-active": this.state.active });
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
                    groupclassName = cn("rui-snav-grp", { "rui-snav-active": true });
                } else {
                    groupclassName = cn("rui-snav-grp", { "rui-snav-active": false });
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

    return NavGroup;
}(React.Component);

exports.default = NavGroup;
module.exports = exports["default"];