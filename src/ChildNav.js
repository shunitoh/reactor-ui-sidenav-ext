
"use strict";

var PropTypes = require('prop-types');

var React = require("react");
var IconTextSchemeMixin = require("./IconTextSchemeMixin");
var cn = require("classnames");

var isActive = function isActive(props) {
    return props.selected.id === props.id;// && props.selected.group === props.group;
};

/**
 * The Single ChildNav Element
 */
export default class ChildNav extends React.Component {
    constructor(props){
        super(props);
        this.state = { active: isActive(this.props) };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ active: isActive(nextProps) });
    }

    itemClicked() {
        if (this.props.onClick) {
            this.props.onClick(this.props.id, this.props.options);
        }
    };

    render() {
        var classNames = cn("rui-child-nav-group-item", { "rui-snav-active": this.state.active });
        if(this.props.selectedId){
            if(this.props.selectedId === this.props.id){
                classNames = cn("rui-child-nav-group-item", {"rui-snav-active": true});
            }else{
                classNames = cn("rui-child-nav-group-item", {"rui-snav-active": false});
            }
        }
        return (
            <div onClick={this.itemClicked.bind(this)} className={classNames}>
                <IconTextSchemeMixin {...this.props} />
            </div>
        );
    }
}

ChildNav.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
