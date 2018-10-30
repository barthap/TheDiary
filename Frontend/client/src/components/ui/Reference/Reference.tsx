import * as React from 'react';
import {IReference, ReferenceType} from "../../../helpers/References";
import {Icon} from "../Icon";
import {Link} from "react-router-dom";
import {Dispatch, Action} from "redux";
import {alertActions} from "../../../actions/alert.actions";
import {connect} from "react-redux";

export enum ReferenceDirection {
    SOURCES,
    TARGETS
}

export interface ReferenceProps {
    data: IReference;
    dir: ReferenceDirection;
}
type ReduxInjectedProps = {
    alertInfo: (msg: string) => void;
    //removeReference: (refId: number) => void;
}

type State = {
    menuOpen: boolean;
}

type Props = ReferenceProps & ReduxInjectedProps;
class ReferenceComponent extends React.Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            menuOpen: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    private renderProperType(): React.ReactNode {
        const { data } = this.props;
        switch (data.type) {
            case ReferenceType.File:
                return (
                    <Link to={this.url('files')}>
                        <Icon type="file"/>&nbsp;
                        {data.fileTitle}
                    </Link>
                );
            case ReferenceType.Document:
                return (
                    <Link to={this.url('documents')}>
                        <Icon type="briefcase"/>&nbsp;
                        {data.documentTitle}
                    </Link>
                );
            case ReferenceType.Person:
                return (
                    <Link to={this.url('people')}>
                        <Icon type="user"/>&nbsp;
                        {data.personName}
                    </Link>
                );
            case ReferenceType.Photo:
                return (
                    <Link to={this.url('photos')}>
                        <Icon type="picture"/>&nbsp;
                        {data.photoTitle}
                    </Link>
                );
            case ReferenceType.Story:
                return (
                    <Link to={this.url('story')}>
                        <Icon type="calendar"/>&nbsp;
                        <b>{data.storyDateTime}</b> - {data.storyHeader}
                    </Link>
                );
            default:
                return <div className="text-danger">Unknown reference!</div>;
        }
    }

    render() {
        return <li onMouseLeave={this.handleLeave}>
            {this.renderProperType()} <small>
                <Icon onClick={this.toggleMenu} type="option-horizontal" alt="More..."/>
                {this.renderMenu()}
            </small>

        </li>;
    }

    private renderMenu() {
        if(!this.state.menuOpen) return;
        return <ul className="dropdown-menu reference-dropdown">
            <li><a href="" onClick={this.handleDelete}>Remove reference</a></li>
        </ul>;
    }

    private toggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen});
    }

    private handleDelete(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        this.props.alertInfo("Removing references is currently turned off, because you cannot create them yet ;)");
        //this.props.removeReference(this.props.data.id);
        this.setState({menuOpen: false});
    }

    private handleLeave() {
        if(this.state.menuOpen)
            this.setState({menuOpen: false});
    }

    private url(base: string) {
        const { data, dir } = this.props;
        const id = dir === ReferenceDirection.TARGETS ? data.targetId : data.sourceId;
        return `/${base}/${id}`;
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    alertInfo: (msg: string) => dispatch(alertActions.info(msg)),
    //removeReference: (id: number) => dispatch(referenceActions.removeReference(id))
});

export const Reference = connect(null, mapDispatchToProps)(ReferenceComponent);