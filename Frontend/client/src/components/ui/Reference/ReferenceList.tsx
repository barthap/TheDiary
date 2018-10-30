import * as React from 'react';
import {IReference} from "../../../helpers/References";
import {Reference, ReferenceDirection} from "./Reference";

export interface ReferenceListProps {
    references: IReference[];
    direction: ReferenceDirection;
}
export const ReferenceList: React.SFC<ReferenceListProps> = ({references, direction}) => {
    if(!references)
        return <p>No references</p>;
    return (
        <ul className="no-dots">
            {(!references || references.length) === 0 ?
                <p>No references</p> :
                references.map(ref => <Reference key={ref.referenceId} dir={direction} data={ref}/>)
            }
        </ul>
    );
};
ReferenceList.displayName = "ReferenceList";