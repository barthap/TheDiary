import * as React from 'react';
import {Person} from "../../types";


export interface PersonFormProps {
    data?: Person;
    onSave: (data: Person) => void;
    onCancel: () => void;
}

type FormState = {
    fullName: string;
    description: string;
    birthDate: Date;
}

const initialState: FormState = {
    fullName: '',
    description: '',
    birthDate: new Date(2000, 1, 1)
};

export class PersonForm extends React.Component<PersonFormProps, FormState> {

    public constructor(props: PersonFormProps) {
        super(props);

        const {data} = props;
        this.state = data ? {
            fullName: data.fullName,
            birthDate: new Date(data.birthDate),
            description: data.description
        } : initialState;

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public componentWillReceiveProps(newProps: PersonFormProps) {
        const {data} = newProps;
        this.setState( data ? {
            fullName: data.fullName,
            birthDate: new Date(data.birthDate),
            description: data.description
        } : initialState);
    }

    public render() {
        const {fullName, description, birthDate} = this.state;
        return (
            <div>
                <form>
                    <fieldset>
                        <legend>Person Form</legend>
                        <div className="form-group">
                            <label htmlFor="fullName" className="control-label">Full name</label>
                            <input value={fullName} onChange={this.handleChange}
                                type="text" required name="fullName" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description"
                                   className="control-label">Description</label>
                            <textarea value={description} onChange={this.handleChange}
                                name="description" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthDate" className="control-label">Birth date</label>
                            <input value={birthDate.toISOString().substring(0, 10)} onChange={this.handleChange}
                                type="date" name="birthDate" className="form-control"/>
                        </div>
                    </fieldset>
                    <button className="btn btn-primary btn-lg" type="submit" style={{margin: 10}}
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
            case 'description':
                this.setState({description: value});
                break;
            case 'birthDate':
                this.setState({birthDate: new Date(value)});
                break;
        }
    }

    private handleSave(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const {fullName, description, birthDate} = this.state;
        const saved: Person = {
            ...this.props.data,
            fullName,
            description,
            birthDate: birthDate.getMilliseconds()
        };

        this.props.onSave(saved);
    }

    private handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.onCancel();
    }
}