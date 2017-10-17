import PropTypes from 'prop-types';
import React from 'react';
import IconTextSchemeMixin from "./IconTextSchemeMixin";
import cn from 'classnames';

var isActive = function isActive(props) {
    return props.selected.id === props.id;// && props.selected.group === props.group;
};

/**
 * The Single Nav Element
 */
export default class Nav extends React.Component {

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
  }

  render() {
    var classNames = cn("rui-snav-item", { "rui-snav-active": this.state.active });
    if(this.props.selectedId){
      if(this.props.selectedId === this.props.id){
        classNames = cn("rui-snav-item", {"rui-snav-active": true});
      }else{
        classNames = cn("rui-snav-item", {"rui-snav-active": false});
      }
    }

    return (
      <div onClick={this.itemClicked.bind(this)} className={classNames} key={this.props.id}>
        <IconTextSchemeMixin {...this.props} />
      </div>
    );
  }
}

Nav.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

module.exports = Nav;
