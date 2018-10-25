import * as React from 'react';

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: string;
    icon?: string;
}

export const Button: React.SFC<ButtonProps> = (props) => {
    const onClick = props.onClick || function () {};
    const btnType = props.type || 'default';
    return (
        <button className={`btn btn-${btnType}`} type="button"
                onClick={onClick}>
            {props.icon && <span className={`glyphicon glyphicon-${props.icon}`}/>} {props.text}
        </button>
    );
};