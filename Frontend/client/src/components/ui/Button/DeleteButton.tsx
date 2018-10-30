import * as React from 'react';
import {Button} from "./Button";

export interface DeleteButtonProps {
    text?: string;
    onClick: () => void;
}

export const DeleteButton: React.SFC<DeleteButtonProps> = (props) => {
    return (
        <Button text={props.text} onClick={props.onClick} icon="trash" type="danger"/>
    );
};
DeleteButton.defaultProps = {
    text: 'Delete'
};
DeleteButton.displayName = "DeleteButton";