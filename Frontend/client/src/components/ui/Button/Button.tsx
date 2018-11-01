import * as React from 'react';
import {Icon} from "../Icon";

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: 'default' | 'primary' | 'danger' | 'warning' | 'success' | 'info' | 'link';
    icon?: string;
    size?: 'xs' | 'sm' | 'lg';
}

export const Button: React.SFC<ButtonProps> = (props) => {
    const size = props.size ? 'btn-'+props.size : '';
    const iconStyle = (props.size === 'lg') ? {top: 3} : {top: 1};
    const icon = <Icon type={props.icon} style={iconStyle}/>;
    return (
        <button className={`btn btn-${props.type} ${size}`} type="button"
                onClick={props.onClick}>
            {props.icon && icon} {props.text}
        </button>
    );
};
Button.defaultProps = {
    onClick: () => {},
    type: 'default',
    size: null
};
Button.displayName = "Button";