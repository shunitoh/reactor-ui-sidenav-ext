
"use strict";

var React = require("react");
var IconTextSchemeMixin = require("./IconTextSchemeMixin");
var PureRenderMixin = require('react-addons-pure-render-mixin');
var cn = require("classnames");

var isActive = function isActive(props) {
    return props.selected.id === props.id;// && props.selected.group === props.group;
};

/**
 * The Single Nav Element
 */
var Nav = React.createClass({
    displayName: "Nav",

    propTypes: {

        id: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired

    },

    mixins: [IconTextSchemeMixin, PureRenderMixin],

    getInitialState: function getInitialState() {
        return { active: isActive(this.props) };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ active: isActive(nextProps) });
    },

    itemClicked: function itemClicked() {

        if (this.props.onClick) {
            this.props.onClick(this.props.id, this.props.options);
        }
    },

    render: function render() {
        var classNames = cn("rui-snav-item", { "rui-snav-active": this.state.active });
        if(this.props.selectedId){
            if(this.props.selectedId === this.props.id){
                classNames = cn("rui-snav-item", {"rui-snav-active": true});
            }else{
                classNames = cn("rui-snav-item", {"rui-snav-active": false});
            }
        }

        return React.createElement(
            "div",
            { onClick: this.itemClicked, className: classNames, key : this.props.id },
            this.createIconTextContent()
        );
    }

});

module.exports = Nav;
