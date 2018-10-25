import * as React from 'react';
import {Person} from "../../types";
// @ts-ignore
import RichTextEditor from 'react-rte';

export interface PersonFormProps {
    title: string
    data?: Person;
    onSave: (data: Person) => void;
    onCancel: () => void;
}

type FormState = {
    fullName: string;
    description: any;
    rawBirthDate: string;
}

const initialState: FormState = {
    fullName: '',
    description: RichTextEditor.createEmptyValue(),
    rawBirthDate: new Date(2000, 1, 1).toISOString()
};

export class PersonForm extends React.Component<PersonFormProps, FormState> {

    public constructor(props: PersonFormProps) {
        super(props);

        const {data} = props;
        this.state = data ? {
            fullName: data.fullName,
            rawBirthDate: new Date(data.birthDate + 24*3600*1000).toISOString(),
            description: RichTextEditor.createValueFromString(data.description, 'markdown')
        } : initialState;

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    public componentWillReceiveProps(newProps: PersonFormProps) {
        const {data} = newProps;
        this.setState( data ? {
            fullName: data.fullName,
            rawBirthDate: new Date(data.birthDate + new Date().getTimezoneOffset()).toISOString(),
            description: RichTextEditor.createValueFromString(data.description, 'markdown')
        } : initialState);
    }

    public render() {
        const {fullName, description, rawBirthDate} = this.state;
        return (
            <div>
                <form>
                    <fieldset>
                        <legend>{this.props.title}</legend>
                        <div className="form-group">
                            <label htmlFor="fullName" className="control-label">Full name</label>
                            <input value={fullName} onChange={this.handleChange}
                                type="text" required name="fullName" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label
                                   className="control-label">Description</label>
                            <RichTextEditor value={description} onChange={this.handleEditorChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthDate" className="control-label">Birth date</label>
                            <input value={rawBirthDate.substring(0, 10)} onChange={this.handleChange}
                                type="date" name="birthDate" className="form-control"/>
                        </div>
                    </fieldset>
                    <button className="btn btn-primary btn-lg m" type="submit"
                            onClick={this.handleSave}>Save
                    </button>
                    <button className="btn btn-default btn-lg" type="button"
                            onClick={this.handleCancel}>Cancel</button>
                </form>
            </div>
        );
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        switch (name) {
            case 'fullName':
                this.setState({fullName: value});
                break;
            case 'birthDate':
                this.setState({rawBirthDate: value});
                break;
        }
    }

    private handleEditorChange(value: any) {
        this.setState({description: value});
    }

    private handleSave(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const {fullName, description, rawBirthDate} = this.state;
        const date = new Date(rawBirthDate);
        const saved: Person = {
            ...this.props.data,
            fullName,
            description: description.toString('markdown'),
            birthDate: date.getTime() + date.getTimezoneOffset()
        };

        this.props.onSave(saved);
    }

    private handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.onCancel();
    }
}