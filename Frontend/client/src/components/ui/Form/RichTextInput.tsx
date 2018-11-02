import * as React from 'react';

let RichTextEditor: any = null;

export interface RichTextInputProps {
    label: string;
    initialValue?: string;
    valueHandler?: (func: (type: string) => string) => void; // DEPRECATED
}

type RichTextInputState = {
    editorValue: any;
}

export class RichTextInput extends React.Component<RichTextInputProps, RichTextInputState> {
    constructor(props: Readonly<RichTextInputProps>) {
        super(props);

        RichTextEditor = null;
        this.state = {
            editorValue: null
        };

        this.handleEditorChange = this.handleEditorChange.bind(this);
        if(props.valueHandler)
            props.valueHandler.call(this, this.getStringValue.bind(this));
    }

    public getStringValue(type: 'markdown' | 'html' = 'markdown'): string {
        return this.state.editorValue.toString(type);
    }

    componentDidMount() {
        RichTextEditor = require('react-rte').default;
        const { initialValue } = this.props;

        if(initialValue && initialValue.length > 0)
            this.setState({
                editorValue: RichTextEditor.createValueFromString(initialValue, 'markdown')
            });
        else
            this.setState({ editorValue: RichTextEditor.createEmptyValue()});
    }

    componentDidUpdate(prevProps: Readonly<RichTextInputProps>, prevState: Readonly<RichTextInputState>, snapshot?: any): void {
        if (prevProps.initialValue === this.props.initialValue) return;

        if (!RichTextEditor)
            RichTextEditor = require('react-rte').default;

        const { initialValue } = this.props;
        if(initialValue.length > 0)
            this.setState({editorValue: RichTextEditor.createValueFromStrong(initialValue, 'markdown')});
        else
            this.setState({editorValue: RichTextEditor.createEmptyValue()});
    }

    private handleEditorChange(value: any) {
        if(RichTextEditor)
            this.setState({editorValue: value});
    }

    render() {
        return <div className="form-group">
            <label className="control-label">{this.props.label}</label>
            {RichTextEditor ?
                <RichTextEditor value={this.state.editorValue} onChange={this.handleEditorChange}/>
                : <pre>Loading editor...</pre>}
        </div>;
    }
}