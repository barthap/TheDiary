import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/pages/Home';

import Menu from "./components/layout/Menu";
import MenuItem from "./components/layout/MenuItem";
import Login from './components/pages/Login';
import Error404 from "./components/pages/Error404";
import Story from './components/pages/StoryPage';
import People from './components/pages/PeoplePage';
import {Switch} from "react-router";
import AlertBox from './components/ui/AlertBox';
import {PrivateRoute} from "./components/util/PrivateRoute";
import PersonPage from "./components/pages/PersonPage";
import AddPersonPage from "./components/pages/AddPersonPage";

const App = () => (
    <div className="container-fluid">
        <div className="row">
            <Menu>
                <MenuItem href="/" title="Home" icon="home" exact/>
                <MenuItem href="/story" title="Story" icon="calendar"/>
                <MenuItem href="/documents" title="Documents" icon="briefcase"/>
                <MenuItem href="/people" title="People" icon="user"/>
                <MenuItem href="/photos" title="Photos" icon="picture"/>
                <MenuItem href="/files" title="Files" icon="folder-open"/>
                <MenuItem href="/about" title="About" icon="info-sign"/>
                <MenuItem href="/login" title="Logout" icon="minus-sign"/>
            </Menu>

            <div className='col-sm-9'>
                <AlertBox/>
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute exact path="/story" component={Story}/>
                    <PrivateRoute exact path="/people" component={People}/>
                    <PrivateRoute exact path="/people/add" component={AddPersonPage}/>
                    <PrivateRoute exact path="/people/:id" component={PersonPage}/>
                    <Route exact path="/login" component={Login}/>
                    <Route component={Error404}/>
                </Switch>
            </div>
        </div>
    </div>
);


export default App;
