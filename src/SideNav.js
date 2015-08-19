/*globals require,module */
/* jshint -W097,esnext: true */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");

var NavGroup = require("./NavGroup");
var Nav = require("./Nav");
//var lodash = require("lodash");
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
var SideNav = React.createClass({
    displayName: "SideNav",

    getInitialState: function getInitialState() {
        return { selected: { id: this.props.selected } };
    },

    buildFromSettings: function buildFromSettings() {
        var _this = this;
        var words = (this.props.words) ? this.props.words : {};
        return this.props.navs.map(function (navkind) {
            //nav kind could have a navlist, which we assume it contains a group of navs options
            if (navkind.navlist) {
                var selected = {
                    id    : _this.state.selected.id,
                    group : navkind.id
                };
                return React.createElement(
                    NavGroup,
                    { key : navkind.id, selected: selected, onClick: _this.onSubNavClick, anotherAction : _this.onClick, nav: navkind, words : words }
                );
            } else {
                return React.createElement(
                    Nav,
                    _extends( {key : navkind.id}, { selected: _this.state.selected }, navkind, { onClick: _this.onClick }, {group : navkind.id}, {words : words})
                );
            }
        });
    },
    onSubNavClick: function onSubNavClick(group, child, options) {
        var selection = { group: group, id: child, options : options};
        this.setState({ selected: selection });
        this.dispatchSelection(selection);
    },
    onClick: function onClick(id, options) {
        var selection = { id: id, options : options };
        this.setState({ selected: selection });
        this.dispatchSelection(selection);
    },

    dispatchSelection: function dispatchSelection(selection) {
        if (this.props.onSelection) {
            this.props.onSelection(selection);
        }
    },
    buildChildren: function buildChildren() {

        if (this.props.navs) {
            return this.buildFromSettings();
        } else {
            return this.props.children;
        }
    },

    render: function render() {
        return React.createElement(
            "div",
            { style: { width: "100%" } },
            this.buildChildren()
        );
    }

});

module.exports = SideNav;
