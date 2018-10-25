import * as React from 'react';
import {Button} from "./Button";

export interface DeleteButtonProps {
    text?: string;
    onClick: () => void;
}

export const DeleteButton: React.SFC<DeleteButtonProps> = (props) => {
    const text = props.text || 'Delete';
    return (
        <Button text={text} onClick={props.onClick} icon="trash" type="danger"/>
    );
};