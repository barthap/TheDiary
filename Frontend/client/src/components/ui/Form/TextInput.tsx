import * as React from 'react';

export interface TextInputProps {
    name: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.SFC<TextInputProps> = ({name, label, value, onChange}) => (
    <div className="form-group">
        <label htmlFor={name} className="control-label">{label}</label>
        <input value={value} onChange={onChange}
               type="text" name={name} id={name} className="form-control"/>
    </div>
);
TextInput.displayName = "TextInput";