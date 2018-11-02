import * as React from 'react';
import {IStory} from "../../../helpers/types";
import {Form} from "../Form/Form";
import {TextInput} from "../Form/TextInput";
import {DateInput} from "../Form/DateInput";
import {RichTextInput} from "../Form/RichTextInput";

export interface StoryFormProps {
    title: string;
    onCancel: () => void;
    onSave: (updated: IStory) => void;
    data?: IStory;
    className?: string;
}

type StoryFormState = {
    header: string;
    rawDate: string;
}

const initialState: StoryFormState = {
    header: '',
    rawDate: new Date(2011,6,1).toISOString()
};

export class StoryForm extends React.Component<StoryFormProps, StoryFormState> {
    private readonly editorRef: React.RefObject<RichTextInput>;

    constructor(props: Readonly<StoryFormProps>) {
        super(props);

        const {data} = props;
        this.state = data? {
            header: data.header,
            rawDate: new Date(data.happenedDate + 24*3600*1000).toISOString()
        } : initialState;

        this.editorRef = React.createRef();

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //TODO: Deprecated, check if needed
    UNSAFE_componentWillReceiveProps(nextProps: Readonly<StoryFormProps>, nextContext: any): void {

        const {data} = nextProps;
        if(data.id === this.props.data.id)
            return;

        this.setState( data ? {
            header: data.header,
            rawDate: new Date(data.happenedDate + new Date().getTimezoneOffset()).toISOString()
        } : initialState);
    }

    render() {
        const { header, rawDate } = this.state;
        const { content } = this.props.data;

        return <div className={"col-lg-8 " + this.props.className}>
            <Form title={this.props.title} onSaveClick={this.handleSave} onCancelClick={this.handleCancel}>
                <TextInput name="header" label="Story header" value={header} onChange={this.handleChange}/>
                <DateInput name="happenedDate" label="Happened on" value={rawDate} onChange={this.handleChange}/>
                <RichTextInput label="Story content" ref={this.editorRef} initialValue={content}/>
            </Form>
        </div>
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        switch (name) {
            case 'header':
                this.setState({header: value});
                break;
            case 'date':
                this.setState({rawDate: value});
                break;
        }
    }

    private handleSave(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const {header, rawDate} = this.state;
        const date = new Date(rawDate);
        const saved: IStory = {
            ...this.props.data,
            header,
            content: this.editorRef.current.getStringValue(),
            happenedDate: date.getTime() + date.getTimezoneOffset()
        };

        this.props.onSave(saved);
    }

    private handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.onCancel();
    }
}