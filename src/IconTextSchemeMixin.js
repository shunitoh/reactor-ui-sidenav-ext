/*globals require,module */
/* jshint -W097,esnext: true */

"use strict";

var React = require("react");

export default class IconTextSchemeMixin extends React.Component {

  render(){
    var contentEls = [],
        propsIcon = this.props.icon,
        propsText = (this.props.words && this.props.words[this.props.text]) ? this.props.words[this.props.text] : this.props.text,
        icon,
        text,
        style = this.props.style; //style= it = icon text, ti , text icon, tbi text below icon

    if (!style) {
        style = "it"; //icon, text
    }
    if (!propsIcon && this.props.nav) {
        propsIcon = this.props.nav.icon;
    }
    if (!propsText && this.props.nav) {
        if(this.props.words && this.props.words[this.props.nav.text]){
            propsText = this.props.words[this.props.nav.text];
        }else{
            propsText = this.props.nav.text;
        }
    }
    var id = (this.props.nav) ? this.props.nav.id : (this.props.id) ? this.props.id : null;
    var optionByIcon = (id) ? { style: { paddingRight: 10 }, className: propsIcon, key : id + '-icon' } : { style: { paddingRight: 10 }, className: propsIcon };
    if (propsIcon) {
        icon = <span {...optionByIcon} />;
    }

    var optionByText = (id) ? { key : id + '-text' } : null;
    if (propsText) {
        text = <span {...optionByText}>
            {propsText}
        </span>;
    }

    if (style === "it") {
        if (icon) {
            contentEls.push(icon);
        }
        if (text) {
            contentEls.push(text);
        }
    }

    return <div>{contentEls}</div>;
  }
};
