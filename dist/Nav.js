'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconTextSchemeMixin = require('./IconTextSchemeMixin');

var _IconTextSchemeMixin2 = _interopRequireDefault(_IconTextSchemeMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isActive = function isActive(props) {
  return props.selected.id === props.id; // && props.selected.group === props.group;
};

/**
 * The Single Nav Element
 */

var Nav = function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav(props) {
    _classCallCheck(this, Nav);

    var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

    _this.state = { active: isActive(_this.props) };

    return _this;
  }

  _createClass(Nav, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ active: isActive(nextProps) });
    }
  }, {
    key: 'itemClicked',
    value: function itemClicked() {
      if (this.props.onClick) {
        this.props.onClick(this.props.id, this.props.options);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classNames = (0, _classnames2.default)("rui-snav-item", { "rui-snav-active": this.state.active });
      if (this.props.selectedId) {
        if (this.props.selectedId === this.props.id) {
          classNames = (0, _classnames2.default)("rui-snav-item", { "rui-snav-active": true });
        } else {
          classNames = (0, _classnames2.default)("rui-snav-item", { "rui-snav-active": false });
        }
      }

      return _react2.default.createElement(
        'div',
        { onClick: this.itemClicked.bind(this), className: classNames, key: this.props.id },
        _react2.default.createElement(_IconTextSchemeMixin2.default, this.props)
      );
    }
  }]);

  return Nav;
}(_react2.default.Component);

exports.default = Nav;


Nav.propTypes = {
  id: _propTypes2.default.string.isRequired,
  text: _propTypes2.default.string.isRequired
};

module.exports = Nav;
module.exports = exports['default'];