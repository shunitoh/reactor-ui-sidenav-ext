/*globals require,module */
/* jshint -W097,esnext: true */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React  = require("react");
var lodash = require("lodash");
var Nav = require("./Nav");
var ChildNavGroup = require("./ChildNavGroup");
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
    var res = props.selected.group === props.nav.id && existCheckByNavId(props.nav, props.selected.id);
    return res;
};

var NavGroup = React.createClass({
    displayName: "NavGroup",

    mixins: [IconTextSchemeMixin, PureRenderMixin],

    getInitialState: function getInitialState() {

        return { collapsed: false, selected: this.props.selected, active: false};
    },

    dispatchSelection: function dispatchSelection(selection) {
        if (this.props.onSelection) {
            this.props.onSelection(selection);
        }
    },
 
    buildChildren: function buildChildren() {
        var _this = this;

        if (this.props.nav) {
            return this.props.nav.navlist.map(function (nav) {
                if(nav.active === false){
                    return;
                }
                if (nav.navlist) {
                    return React.createElement(
                        ChildNavGroup, 
                        { key : nav.id, selectedId : _this.props.selectedId, selected: _this.state.selected, onClick: _this.onChildNavClick, anotherAction : _this.onSubNavClick, nav: nav, words : _this.props.words }
                    );
                } else {
                    return React.createElement(
                        Nav, 
                        _extends({ key : nav.id}, {selectedId : _this.props.selectedId}, {selected: _this.state.selected}, nav, {onClick: _this.onSubNavClick}, {group : nav.id}, {words : _this.props.words})
                    );
                }
            });
        } else {
            return this.props.children;
        }
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ selected: nextProps.selected, active: isActive(nextProps) });
    },

    onChildNavClick: function onChildNavClick(group, child, options) {
        if (this.props.onClick) {
            this.props.onClick(this.props.nav.id, child, options);
            var selection = { group: group, id: child, options : options };
            this.setState({ selected: selection });
        }
            //this.dispatchSelection(selection);
    },
 
    /**
     *  The ID of this would be this.props.id/the clicked nav id
     */
    onSubNavClick: function onSubNavClick(id, options) {
        if (this.props.onClick) {
            this.props.onClick(this.props.nav.id, id, options);
            var selection = { id: id, options : options };
            this.setState({ selected: selection });
        }
    },

    onClick: function onClick() {
        if(this.props.selectedId){
            delete(this.props.selectedId);
        }
        if (lodash.has(this.props, 'anotherAction')) {
            this.props.anotherAction(this.props.nav.id, this.props.nav.options);
        }
        this.setState({ collapsed: !this.state.collapsed });
    },

    componentDidMount: function componentDidMount() {
        //we cant transition 0 height to auto height.. so below is the result
        this.cloned = this.refs.cont.getDOMNode().cloneNode(true);
    },

    render: function render() {
        var style = {};
        var itemsClassnames = cn("rui-snav-items");
        var groupclassName  = cn("rui-snav-grp", { "rui-snav-active": this.state.active });
        if (this.state.collapsed) {
            if(this.cloned.clientHeight === 0){
                style["height"] = 0;
            }else{
                style["height"] = 'auto';
            }
        } else {
            if(existCheckByNavId(this.props.nav, this.props.selected.id)){
                style["height"] = 'auto';
            }else{
                style["height"] = 0;
            }
        }

        if(this.props.selectedId){
            style["height"]     = 'auto';
            if(existCheckByNavId(this.props.nav, this.props.selectedId)){
                groupclassName  = cn("rui-snav-grp", { "rui-snav-active": true});
            }
        }


        return React.createElement(
            "div",
            { className: "rui-snav-grp-c" },
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

module.exports = NavGroup;
