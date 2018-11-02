import * as React from 'react';
import {IPerson} from "../../../helpers/types";
import {Form} from "../Form/Form";
import {TextInput} from "../Form/TextInput";
import {DateInput} from "../Form/DateInput";
import {RichTextInput} from "../Form/RichTextInput";

export interface PersonFormProps {
    title: string
    data?: IPerson;
    onSave: (data: IPerson) => void;
    onCancel: () => void;
}

type FormState = {
    fullName: string;
    rawBirthDate: string;
}

const initialState: FormState = {
    fullName: '',
    rawBirthDate: new Date(2000, 1, 1).toISOString()
};

export class PersonForm extends React.Component<PersonFormProps, FormState> {
    private readonly editorRef: React.RefObject<RichTextInput>;

    public constructor(props: PersonFormProps) {
        super(props);

        const {data} = props;
        this.state = data ? {
            fullName: data.fullName,
            rawBirthDate: new Date(data.birthDate + 24*3600*1000).toISOString(),
        } : initialState;

        this.editorRef = React.createRef();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public UNSAFE_componentWillReceiveProps(newProps: PersonFormProps) {
        const {data} = newProps;
        this.setState( data ? {
            fullName: data.fullName,
            rawBirthDate: new Date(data.birthDate + new Date().getTimezoneOffset()).toISOString()
        } : initialState);
    }

    public render() {
        const {fullName, rawBirthDate} = this.state;
        return (
            <Form title={this.props.title} onSaveClick={this.handleSave} onCancelClick={this.handleCancel}>
                <TextInput name="fullName" label="Full name" value={fullName} onChange={this.handleChange}/>
                <RichTextInput label="Description" initialValue={this.props.data.description} ref={this.editorRef}/>
                <DateInput name="birthDate" label="Birth date" value={rawBirthDate} onChange={this.handleChange}/>
            </Form>
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

    private handleSave(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const {fullName, rawBirthDate} = this.state;
        const date = new Date(rawBirthDate);
        const saved: IPerson = {
            ...this.props.data,
            fullName,
            description: this.editorRef.current.getStringValue('markdown'),
            birthDate: date.getTime() + date.getTimezoneOffset()
        };

        this.props.onSave(saved);
    }

    private handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.onCancel();
    }
}