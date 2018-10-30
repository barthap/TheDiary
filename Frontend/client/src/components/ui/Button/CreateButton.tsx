import * as React from 'react';
import {Button} from "./Button";

export interface CreateButtonProps {
    text?: string;
    onClick?: () => void;
}

export const CreateButton: React.SFC<CreateButtonProps> = (props) => {
    return <Button text={props.text} onClick={props.onClick} icon="plus" type="success"/>
};
CreateButton.defaultProps = {
    text: 'Create'
};
CreateButton.displayName = "CreateButton";