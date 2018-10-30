import * as React from 'react';
import {Button} from "./Button";

export interface CancelButtonProps {
    text?: string;
    onClick: () => void;
    size?: 'xs' | 'sm' | 'lg';
    highlighted?: boolean
}

export const CancelButton: React.SFC<CancelButtonProps> = (props) => {
    const color = props.highlighted ? 'warning' : 'default';
    return (
        <Button text={props.text} {...props} icon="ban-circle" type={color}/>
    );
};
CancelButton.defaultProps = {
    text: 'Cancel',
    size: null,
    highlighted: false
};
CancelButton.displayName = "CancelButton";