import * as React from 'react';

export const Toolbar: React.SFC<{className?: string}> = (props) => (
    <div role="group" className={`btn-group ${props.className || ''}`}>
        {props.children}
    </div>
);