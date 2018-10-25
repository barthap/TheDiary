import * as React from 'react';
import {Button} from "./Button";

export interface EditButtonProps {
    text?: string;
    onClick: () => void;
}

export const EditButton: React.SFC<EditButtonProps> = (props) => {
    const text = props.text || 'Edit';
    return (
        <Button text={text} onClick={props.onClick} icon="pencil" type="primary"/>
    );
};