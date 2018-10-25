import * as React from 'react';
import {Button} from "./Button";

export interface CreateButtonProps {
    text?: string;
    onClick?: () => void;
}

export const CreateButton: React.SFC<CreateButtonProps> = (props) => {
    const text = props.text || 'Create';
    return <Button text={text} onClick={props.onClick} icon="plus" type="primary"/>
};