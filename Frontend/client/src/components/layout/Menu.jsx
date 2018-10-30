import React from 'react';
import {Link} from "react-router-dom";

const Menu = (props) => (
    <div className='col-sm-3'>
        <nav className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'/>
                        <span className='icon-bar'/>
                        <span className='icon-bar'/>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>TheDiary</Link>
                </div>
                <div className='clearfix'/>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        {props.children}
                    </ul>
                </div>
            </div>
        </nav>;
    </div>
);

export default Menu;
