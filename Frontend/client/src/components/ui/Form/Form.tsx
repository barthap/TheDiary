import * as React from 'react';
import {Button} from "../Button/Button";

export interface FormProps {
    title: string
    onSaveClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onCancelClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Form: React.SFC<FormProps> = (props) => (
    <div>
        <form>
            <fieldset>
                <legend>{props.title}</legend>
                {props.children}
            </fieldset>
            <Button text="Save" type="primary" size="lg" onClick={props.onSaveClick} className="m"/>
            <Button text="Cancel" type="default" size="lg" onClick={props.onCancelClick}/>
        </form>
    </div>
);
Form.displayName = "Form";