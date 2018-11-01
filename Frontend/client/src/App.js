import React from 'react';
import {Route} from 'react-router-dom';
import Home from './components/pages/Home';

import AppMenu from "./components/layout/Menu";
import MenuItem from "./components/layout/MenuItem";
import Login from './components/pages/Login';
import Error404 from "./components/pages/Error404";
import Story from './components/pages/StoryPage';
import People from './components/pages/PeoplePage';
import {Switch} from "react-router";
import AlertBox from './components/ui/Containers/AlertBox';
import {PrivateRoute} from "./components/util/PrivateRoute";
import PersonPage from "./components/pages/PersonPage";
import AddPersonPage from "./components/pages/AddPersonPage";
import PhotosPage from "./components/pages/PhotosPage";
import AddPhotoPage from "./components/pages/AddPhotoPage";
import {AboutPage} from "./components/pages/AboutPage";

const App = () => (
    <div className="container-fluid">
        <div className="row">
            <AppMenu>
                <MenuItem priv href="/" title="Home" icon="home" exact/>
                <MenuItem priv href="/story" title="Story" icon="calendar"/>
                <MenuItem priv href="/documents" title="Documents" icon="briefcase"/>
                <MenuItem priv href="/people" title="People" icon="user"/>
                <MenuItem priv href="/photos" title="Photos" icon="picture"/>
                <MenuItem priv href="/files" title="Files" icon="folder-open"/>
                <MenuItem href="/about" title="About" icon="info-sign"/>
                <MenuItem href="/login" title="Sign in/out" icon="minus-sign"/>
            </AppMenu>

            <div className='col-sm-9'>
                <AlertBox/>
                <Switch>
                    <PrivateRoute exact path="/" component={Home}/>
                    <PrivateRoute exact path="/story/:id?" component={Story}/>

                    <PrivateRoute exact path="/people" component={People}/>
                    <PrivateRoute exact path="/people/add" component={AddPersonPage}/>
                    <PrivateRoute exact path="/people/:id" component={PersonPage}/>

                    <PrivateRoute exact path="/photos/add" component={AddPhotoPage}/>
                    <PrivateRoute exact path="/photos/:id?" component={PhotosPage}/>

                    <Route exact path="/about" component={AboutPage}/>

                    <Route exact path="/login" component={Login}/>
                    <Route component={Error404}/>
                </Switch>
            </div>
        </div>

    </div>
);


export default App;
