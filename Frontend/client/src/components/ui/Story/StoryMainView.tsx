import * as React from 'react';
import {IStory} from "../../../helpers/types";
import {Icon} from "../Icon";
import {displayDate} from "../../../helpers/utils";
import {AuditInfo} from "../AuditInfo";
import ReactMarkdown = require("react-markdown");
import {Button} from "../Button/Button";

export interface StoryMainViewProps {
    story: IStory;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const StoryMainView: React.SFC<StoryMainViewProps> = ({story, onEdit, onDelete}) => (
    <article className="col-lg-8 story-main">
        <h2><em>{story.header}</em></h2>
        <p className="lead"><Icon type="calendar"/> {displayDate(story.happenedDate)}</p>
        <AuditInfo entity={story}/>
        <hr/>
        <ReactMarkdown source={story.content}/>
        <section className="story-toolbar">
            <Button text="Edit" type="link" size="sm" onClick={onEdit}/>
            <Button text="Delete" type="link" size="sm" onClick={onDelete}/>
        </section>
    </article>
);
StoryMainView.displayName = "StoryMainView";