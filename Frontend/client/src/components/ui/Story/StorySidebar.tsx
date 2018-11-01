import * as React from 'react';
import {ReferenceDirection} from "../Reference/Reference";
import {IStory} from "../../../helpers/types";
import {Icon} from "../Icon";
import {ReferenceList} from "../Reference/ReferenceList";

export interface StorySidebarProps {
    story: IStory;
}

export const StorySidebar: React.SFC<StorySidebarProps> = ({story}) => (
    <div className="col-lg-3">
        <section className="well m-t-lg">
            <h4><Icon type="star-empty"/> Referenced in...</h4>
            <ReferenceList references={story.referencedIn} direction={ReferenceDirection.SOURCES}/>
        </section>

        <section className="well">
            <h4><Icon type="star"/> References to...</h4>
            <ReferenceList references={story.referencesTo} direction={ReferenceDirection.TARGETS}/>
        </section>
    </div>
);
StorySidebar.displayName = "StorySidebar";