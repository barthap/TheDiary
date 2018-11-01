import * as React from 'react';
import {IStory} from "../../../helpers/types";

let RichTextEditor: any = null;

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
    content: any;
}

const initialState: StoryFormState = {
    header: '',
    rawDate: new Date(2011,6,1).toISOString(),
    content: null //RichTextEditor.createEmptyValue()
};

export class StoryForm extends React.Component<StoryFormProps, StoryFormState> {

    constructor(props: Readonly<StoryFormProps>) {
        super(props);
        RichTextEditor = null;

        const {data} = props;
        this.state = data? {
            header: data.header,
            rawDate: new Date(data.happenedDate + 24*3600*1000).toISOString(),
            content: null //RichTextEditor.createValueFromString(data.content, 'markdown')
        } : initialState;

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

     componentDidMount() {
        RichTextEditor = require('react-rte').default;
        if(this.props.data)
            this.setState({
                content: RichTextEditor.createValueFromString(this.props.data.content, 'markdown')
            });
        else
            this.setState({ content: RichTextEditor.createEmptyValue()});
     }

    //TODO: Deprecated, check if needed
    UNSAFE_componentWillReceiveProps(nextProps: Readonly<StoryFormProps>, nextContext: any): void {
        if(!RichTextEditor)
            RichTextEditor = require('react-rte').default;

        const {data} = nextProps;
        if(data.id === this.props.data.id)
            return;

        this.setState( data ? {
            header: data.header,
            rawDate: new Date(data.happenedDate + new Date().getTimezoneOffset()).toISOString(),
            content: RichTextEditor.createValueFromString(data.content, 'markdown')
        } : initialState);
    }

    render() {
        const { header, content, rawDate } = this.state;
        return <div className={"col-lg-8 " + this.props.className}>
            <form>
                <fieldset>
                    <legend>{this.props.title}</legend>
                    <div className="form-group">
                        <label htmlFor="header" className="control-label">Story header</label>
                        <input value={header} onChange={this.handleChange}
                               type="text" name="header" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" className="control-label">Happened on</label>
                        <input value={rawDate.substring(0, 10)} onChange={this.handleChange}
                               type="date" name="date" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Story content</label>
                        {RichTextEditor ?
                            <RichTextEditor value={content} onChange={this.handleEditorChange}/>
                            : <pre>Loading editor...</pre>}
                    </div>
                </fieldset>
                <button className="btn btn-primary btn-lg m" type="submit"
                        onClick={this.handleSave}>Save
                </button>
                <button className="btn btn-default btn-lg" type="button"
                        onClick={this.handleCancel}>Cancel</button>
            </form>
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

    private handleEditorChange(value: any) {
        if(RichTextEditor)
            this.setState({content: value});
    }

    private handleSave(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const {header, content, rawDate} = this.state;
        const date = new Date(rawDate);
        const saved: IStory = {
            ...this.props.data,
            header,
            content: content ? content.toString('markdown') : '',
            happenedDate: date.getTime() + date.getTimezoneOffset()
        };

        this.props.onSave(saved);
    }

    private handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.props.onCancel();
    }
}