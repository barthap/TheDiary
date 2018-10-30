import * as React from 'react';
import {IPhoto} from "../../../helpers/types";
import '../../../../res/scss/gallery.scss';
import {Photo} from "./Photo";

export interface PhotoGalleryProps {
    photos: IPhoto[];
    onPhotoClick: (id: number) => void;
}

export const PhotoGallery: React.SFC<PhotoGalleryProps> = (props) => (
    <div className="photoGallery">
        {props.photos.length === 0 && <p>Gallery has no photos</p>}
        <div className="masonry">
            {props.photos.map(p =>
                <Photo key={p.id} photo={p} onClick={props.onPhotoClick}/>
            )}
        </div>
    </div>
);
PhotoGallery.displayName = "PhotoGallery";