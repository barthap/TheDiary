import * as React from 'react';
import {Button} from "./Button";

export interface EditButtonProps {
    text?: string;
    onClick: () => void;
}

export const EditButton: React.SFC<EditButtonProps> = (props) => {
    return (
        <Button text={props.text} onClick={props.onClick} icon="pencil" type="primary"/>
    );
};
EditButton.defaultProps = {
    text: 'Edit'
};
EditButton.displayName = "EditButton";