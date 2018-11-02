import * as React from 'react';
import {IPhoto} from "../../../helpers/types";
import {Modal} from "../Modal";
import {FetchableImage} from "../../util/FetchableImage";
import {AuditInfo} from "../AuditInfo";
import * as ReactMarkdown from "react-markdown";
import {EntityReferences} from "../Reference/EntityReferences";

export interface PhotoPreviewProps {
    activePhoto: IPhoto;
    show: boolean;
    handleModalClose: () => void;
}

export const PhotoPreview: React.SFC<PhotoPreviewProps> = ({activePhoto, show, handleModalClose}) => (
    <Modal title={activePhoto.title}
           show={show}
           handleClose={handleModalClose}
    >
        <FetchableImage
            style={{maxWidth: '100%'}}
            src={`${API_URL}/photos/${activePhoto.id}`}
            alt={activePhoto.title}/>
        <AuditInfo entity={activePhoto}/>
        <ReactMarkdown source={activePhoto.description}/>
        <EntityReferences entity={activePhoto}/>
    </Modal>
);
PhotoPreview.displayName = "PhotoPreview";