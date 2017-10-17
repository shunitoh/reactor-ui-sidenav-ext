/*globals require,module */
/* jshint -W097,esnext: true */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NavGroup = require('./NavGroup');

var _NavGroup2 = _interopRequireDefault(_NavGroup);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * The SideNav is a Side Navigation component duH!
 *
 * navs = [
 *     { title: "Main Group" , navlist: [
 *          { title: "Nav 1" }
 *       ]
 *     }
 * ]
 * @type {*|Function}
 */
var SideNav = function (_React$Component) {
    _inherits(SideNav, _React$Component);

    function SideNav(props) {
        _classCallCheck(this, SideNav);

        var _this2 = _possibleConstructorReturn(this, (SideNav.__proto__ || Object.getPrototypeOf(SideNav)).call(this, props));

        _this2.state = { selected: { id: _this2.props.selectedId } };
        return _this2;
    }

    _createClass(SideNav, [{
        key: 'buildFromSettings',
        value: function buildFromSettings() {
            var _this = this;
            var words = this.props.words ? this.props.words : {};
            return this.props.navs.map(function (navkind) {
                //nav kind could have a navlist, which we assume it contains a group of navs options
                if (navkind.active === false) {
                    return;
                }

                if (navkind.navlist) {
                    var selected = {
                        id: _this.state.selected.id,
                        group: navkind.id
                    };
                    return _react2.default.createElement(_NavGroup2.default, {
                        key: navkind.id,
                        id: navkind.id,
                        selectedId: _this.state.selected.id,
                        selected: selected,
                        onClick: _this.onSubNavClick.bind(_this),
                        anotherAction: _this.onClick.bind(_this),
                        nav: navkind,
                        words: words });
                } else {
                    return _react2.default.createElement(_Nav2.default, _extends({ key: navkind.id }, { id: navkind.id }, { selectedId: _this.state.selected.id }, { selected: _this.state.selected }, navkind, { onClick: _this.onClick.bind(_this) }, { group: navkind.id }, { words: words }));
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps !== undefined) {
                this.setState({ selected: { id: nextProps.selectedId } });
            }
        }
    }, {
        key: 'onSubNavClick',
        value: function onSubNavClick(group, child, options) {
            var selection = { group: group, id: child, options: options };
            this.setState({ selected: selection });
            this.dispatchSelection(selection);
        }
    }, {
        key: 'onClick',
        value: function onClick(id, options) {
            var selection = { id: id, options: options };
            this.setState({ selected: selection });
            this.dispatchSelection(selection);
        }
    }, {
        key: 'dispatchSelection',
        value: function dispatchSelection(selection) {
            if (this.props.onSelection) {
                this.props.onSelection(selection);
            }
        }
    }, {
        key: 'buildChildren',
        value: function buildChildren() {
            if (this.props.navs) {
                return this.buildFromSettings();
            } else {
                return this.props.children;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: { width: "100%" } },
                this.buildChildren()
            );
        }
    }]);

    return SideNav;
}(_react2.default.Component);

exports.default = SideNav;
module.exports = exports['default'];