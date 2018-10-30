import * as React from 'react';
import {IPhoto} from "../../../helpers/types";
import {API_URL} from "../../../consts";
import '../../../../res/scss/gallery.scss';
import {FetchableImage} from "../../util/FetchableImage";

export interface PhotoProps {
    photo: IPhoto;
    className?: string;
    onClick?: (id: number) => void;
}

export class Photo extends React.Component<PhotoProps> {

    constructor(props: Readonly<PhotoProps>) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { className, photo } = this.props;

        if(!photo)
            return <pre>Couldn't load photo</pre>;

        const src = `${API_URL}/photos/${photo.id}`;

        return (
            <div className="gallery-item">
                <FetchableImage src={src} className={className} alt={photo.title} onClick={this.handleClick}/>
                <div className="photo-title-bg"/>
                <div className="photo-title">{photo.title}</div>
            </div>
        );
    }

    private handleClick() {
        this.props.onClick(this.props.photo.id);
    }
}
