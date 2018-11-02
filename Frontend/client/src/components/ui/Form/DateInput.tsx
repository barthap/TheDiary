import * as React from 'react';

export interface DateInputProps {
    name: string;
    label: string;
    value: string;  //ISO string YYYY-MM-DD
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateInput: React.SFC<DateInputProps> = ({name, label, value, onChange}) => (
    <div className="form-group">
        <label htmlFor={name} className="control-label">{label}</label>
        <input value={value.substring(0, 10)} onChange={onChange}
               type="date" name={name} id={name} className="form-control"/>
    </div>
);
DateInput.displayName = "DateInput";