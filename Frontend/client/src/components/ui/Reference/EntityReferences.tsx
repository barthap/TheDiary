import * as React from 'react';
import {EntityBase} from "../../../helpers/types";
import {ReferenceList} from "./ReferenceList";
import {ReferenceDirection} from "./Reference";

export interface EntityReferencesProps {
    entity: EntityBase
}

export const EntityReferences: React.SFC<EntityReferencesProps> = ({entity}) => (
    <div className="container-fluid">
        <div className="col-md-6 col-lg-4">
            <h3>Referenced in:</h3>
            <ReferenceList direction={ReferenceDirection.SOURCES}
                           references={entity.referencedIn}/>
        </div>
        <div className="col-md-6 col-lg-4">
            <h3>References to:</h3>
            <ReferenceList direction={ReferenceDirection.TARGETS}
                           references={entity.referencesTo}/>
        </div>
    </div>
);
EntityReferences.displayName = "EntityReferences";