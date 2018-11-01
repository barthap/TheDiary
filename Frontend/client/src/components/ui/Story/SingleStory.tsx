import * as React from 'react';
import {IStory} from "../../../helpers/types";
import {StoryMainView} from "./StoryMainView";
import {StorySidebar} from "./StorySidebar";
import {StoryForm} from "./StoryForm";

export interface SingleStoryProps {
    story: IStory;
    onSave: (updated: IStory) => void;
    onDelete: (id: number) => void;
}
type State = {
    isEditing: boolean;
}

export class SingleStory extends React.Component<SingleStoryProps, State> {

    constructor(props: Readonly<SingleStoryProps>) {
        super(props);

        this.state = {
            isEditing: false
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        const { story } = this.props;
        const { isEditing } = this.state;
        return (<div className="row">
            {isEditing ?
                <StoryForm data={story} title="Edit story" onSave={this.handleSave} onCancel={this.handleCancel} />
                : <StoryMainView story={story} onEdit={this.handleEdit} onDelete={this.handleDelete}/>
            }

            <StorySidebar story={story}/>
        </div>);
    }

    private handleSave(updated: IStory) {
        this.setState({isEditing: false});
        this.props.onSave(updated);
    }

    private handleEdit() {
        this.setState({isEditing: true})
    }

    private handleDelete() {
        this.props.onDelete(this.props.story.id);
    }

    private handleCancel() {
        this.setState({isEditing: false})
    }
}