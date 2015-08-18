import React                      from 'react';
import SideNavData                from '../constants/variables/SideNav.json';
import { SideNav, NavGroup, Nav } from 'reactor-ui-sidenav-ext';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    onSelection(selection){
        console.log('App.onSelection.selection', selection);
    }

    render() {
        console.log('App.render');
        return (
            <div className="rui-snav-area">
                <SideNav navs={SideNavData} onSelection={this.onSelection.bind(this)}/>
            </div>
        );
    }
}

