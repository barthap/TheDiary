import * as React from 'react';
import {NavLink} from "react-router-dom";

export interface MenuItemProps {
    href: string,
    title: string;
    icon: string;
    exact?: boolean;
}

const MenuItem: React.SFC<MenuItemProps> = (props) => (
    <li>
        <NavLink to={ props.href } exact={props.exact || false} activeClassName='active'>
            <span className={`glyphicon glyphicon-${props.icon}`}/> {props.title}
        </NavLink>
    </li>
);

export default MenuItem;
