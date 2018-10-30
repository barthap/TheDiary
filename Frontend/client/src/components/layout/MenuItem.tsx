import * as React from 'react';
import {NavLink} from "react-router-dom";
import {isUserLoggedIn} from "../../helpers/utils";

export interface MenuItemProps {
    href: string,
    title: string;
    icon: string;
    exact?: boolean;
    priv?: boolean;
}

const MenuItem: React.SFC<MenuItemProps> = (props) => {
    if(props.priv && !isUserLoggedIn()) //do not render
        return null;

    return (
        <li>
            <NavLink to={ props.href } exact={props.exact || false} activeClassName='active'>
                <span className={`glyphicon glyphicon-${props.icon}`}/> {props.title}
            </NavLink>
        </li>
    );
};
MenuItem.displayName = "MenuItem";
MenuItem.defaultProps = {
    exact: false,
    priv: false
};
export default MenuItem;
