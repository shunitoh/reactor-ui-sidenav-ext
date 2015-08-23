/*globals require,module */
/* jshint -W097,esnext: true */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var Nav = require("./ChildNav");
var IconTextSchemeMixin = require("./IconTextSchemeMixin");
var cn = require("classnames");
var PureRenderMixin = require("react/addons").addons.PureRenderMixin;
var existCheckByNavId = function(parent, searchKey) {
    if(parent && parent.id === searchKey){
        return true;
    }
    if (parent && parent.navlist) {
        var l     = parent.navlist.length;
        var child = null;
        for (var i = 0; i < l; ++i) {
            child = parent.navlist[i];

            if(existCheckByNavId(child, searchKey)){
                return true;
            }
        }
    }
}

var isActive = function isActive(props) {
    var res = existCheckByNavId(props.nav, props.selected.id);
    return res;
};

var ChildNavGroup = React.createClass({
    displayName: "ChildNavGroup",

    mixins: [IconTextSchemeMixin, PureRenderMixin],

    getInitialState: function getInitialState() {

        return { collapsed: false, selected: this.props.selected, active: false};
    },

    buildChildren: function buildChildren() {
        var _this = this;

        if (this.props.nav) {
            return this.props.nav.navlist.map(function (nav) {
                if(nav.active === false){
                    return;
                }
                return React.createElement(Nav, _extends({ key : nav.id, selected: _this.state.selected, onClick: _this.onSubNavClick, words : _this.props.words }, nav));
            });
        } else {
            return this.props.children;
        }
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ selected: nextProps.selected, active: isActive(nextProps) });
    },

    /**
     *  The ID of this would be this.props.id/the clicked nav id
     */
    onSubNavClick: function onSubNavClick(id, options) {
        if (this.props.onClick) {
            this.props.onClick(this.props.nav.id, id, options);
        }
    },

    onClick: function onClick() {
        if (this.props.anotherAction) {
            this.props.anotherAction(this.props.nav.id, this.props.nav.options);
        }
        this.setState({ collapsed: !this.state.collapsed });
    },

    componentDidMount: function componentDidMount() {
        //we cant transition 0 height to auto height.. so below is the result
        if (!this.__computedHeight) {
            var cloned = this.refs.cont.getDOMNode().cloneNode(true);
            cloned.style.position = "absolute";
            cloned.style.left = "-9999px";
            cloned.style.height = "auto";
            document.body.appendChild(cloned);
            this.__computedHeight = cloned.clientHeight;
            document.body.removeChild(cloned);
        }
    },

    render: function render() {
        var itemsClassnames = cn("rui-snav-items");
        var groupclassName  = cn("rui-snav-cgrp", { "rui-snav-child-active": this.state.active });
        var style = {};
        if (this.state.collapsed) {
            style["height"] = this.__computedHeight;
        } else {
            style["height"] = 0;
        }

        return React.createElement(
            "div",
            { className: "rui-snav-cgrp-c" },
            React.createElement(
                "div",
                { onClick: this.onClick, className: groupclassName },
                this.createIconTextContent()
            ),
            React.createElement(
                "div",
                { ref: "cont", style: style, className: itemsClassnames },
                this.buildChildren()
            )
        );
    }
});

module.exports = ChildNavGroup;
