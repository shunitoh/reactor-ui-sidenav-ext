/*globals require,module */
/* jshint -W097,esnext: true */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import NavGroup from './NavGroup';
import Nav from './Nav';

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
export default class SideNav extends React.Component {
    constructor(props){
        super(props);
        this.state = { selected: { id: this.props.selectedId } };
    }

    buildFromSettings() {
        var _this = this;
        var words = (this.props.words) ? this.props.words : {};
        return this.props.navs.map(function (navkind) {
            //nav kind could have a navlist, which we assume it contains a group of navs options
            if(navkind.active === false){
                return;
            }

            if (navkind.navlist) {
                var selected = {
                    id    : _this.state.selected.id,
                    group : navkind.id
                };
                return (
                    <NavGroup
                        key={navkind.id}
                        id={navkind.id}
                        selectedId={_this.state.selected.id}
                        selected={selected}
                        onClick={_this.onSubNavClick.bind(_this)}
                        anotherAction={_this.onClick.bind(_this)}
                        nav={navkind}
                        words={words} />
                );
            } else {
                return (
                    <Nav
                        {..._extends(
                            {key : navkind.id},
                            {id : navkind.id},
                            {selectedId : _this.state.selected.id},
                            {selected: _this.state.selected },
                            navkind,
                            { onClick: _this.onClick.bind(_this) },
                            {group : navkind.id},
                            {words : words}
                        )}
                    />
                );
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== undefined) {
            this.setState({selected: { id: nextProps.selectedId }});
        }
    }

    onSubNavClick(group, child, options) {
        var selection = { group: group, id: child, options : options};
        this.setState({ selected: selection });
        this.dispatchSelection(selection);
    }

    onClick(id, options) {
        var selection = { id: id, options : options };
        this.setState({ selected: selection });
        this.dispatchSelection(selection);
    }

    dispatchSelection(selection) {
        if (this.props.onSelection) {
            this.props.onSelection(selection);
        }
    }

    buildChildren() {
        if (this.props.navs) {
            return this.buildFromSettings();
        } else {
            return this.props.children;
        }
    }

    render() {
        return (
            <div style={{ width: "100%" }}>
                {this.buildChildren()}
            </div>
        );
    }
}
