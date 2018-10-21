import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/pages/Home';
import ItemView from './boilerplate/containers/list_item_view';

import Menu from "./components/layout/Menu";
import MenuItem from "./components/layout/MenuItem";
import Login from './components/pages/Login';
import Error404 from "./components/pages/Error404";
import {Switch} from "react-router";
import AlertBox from './components/ui/AlertBox';

const App = () => (
        <div className="container-fluid">
            <div className="row">
                <Menu>
                    <MenuItem href="/" title="Home" icon="home"/>
                    <MenuItem href="/about" title="About" icon="th-list"/>
                    <MenuItem href="/login" title="Login" icon="th-list"/>
                </Menu>

                <div className='col-sm-9'>
                    <AlertBox />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/view/:name" component={ItemView}/>
                        <Route exact path="/login" component={Login}/>
                        <Route component={Error404}/>
                    </Switch>
                </div>
            </div>
        </div>
    );


export default App;
