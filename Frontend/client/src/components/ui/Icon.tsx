import * as React from 'react';

export interface IconProps {
    type: string
}
type Props = IconProps & React.HTMLProps<HTMLSpanElement>;
export const Icon: React.SFC<Props> = (props) =>
    <span {...props} className={`glyphicon glyphicon-${props.type}`}/>;

Icon.displayName = "Icon";