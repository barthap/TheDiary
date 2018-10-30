import * as React from 'react';
import {EntityBase} from "../../helpers/types";
import {displayDateTime} from "../../helpers/utils";

export interface AuditInfoProps {
    entity: EntityBase;
}

export const AuditInfo: React.SFC<AuditInfoProps> = ({entity}) => (
    <details>
        <p>Created at: <em>{displayDateTime(entity.createdDateTime)}</em></p>
        <p>Updated at: <em>{displayDateTime(entity.updatedDateTime)}</em></p>
    </details>
);
AuditInfo.displayName = "AuditInfo";