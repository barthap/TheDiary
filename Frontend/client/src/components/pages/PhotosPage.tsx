import * as React from 'react';
import {connect} from "react-redux";
import {IAppState} from "../../reducers";
import {Dispatch} from "redux";
import {FetchPhotosAction, photoActions} from "../../actions/photo.actions";
import {IPhotosState} from "../../reducers/photo.reducer";
import {PhotoGallery} from "../ui/Gallery/PhotoGallery";
import {Toolbar} from "../ui/Toolbar";
import {Link, RouteComponentProps} from "react-router-dom";
import {CreateButton} from "../ui/Button/CreateButton";
import {API_URL} from "../../consts";
import {Modal} from "../ui/Modal";
import {FetchableImage} from "../util/FetchableImage";
import * as ReactMarkdown from "react-markdown";
import {EntityReferences} from "../ui/Reference/EntityReferences";
import {IPhoto} from "../../helpers/types";
import {AuditInfo} from "../ui/AuditInfo";

interface ReduxInjectedProps {
    photosState: IPhotosState;
    fetchPhotos: () => void;
}

type GalleryState = {
    clickedId: number;
    showModal: boolean;
}

type PageProps = ReduxInjectedProps & RouteComponentProps<{id?: string}>;
class PhotosPage extends React.Component<PageProps, GalleryState> {
    
    constructor(props: PageProps) {
        super(props);
        
        if(props.photosState.items.Count() < 1)
            props.fetchPhotos();

        const initialId = parseInt(this.props.match.params.id || "0") || 0;
        this.state = {
            clickedId: initialId,
            showModal: initialId > 0
        };

        this.handlePhotoClick = this.handlePhotoClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<PageProps>, prevState: Readonly<GalleryState>, snapshot?: any): void {
        const { params } = this.props.match;
        if(prevProps.match.params.id !== params.id) {
            if(this.state.showModal === true) {
                const id = parseInt(params.id || "0") || 0;
                this.setState({clickedId: id, showModal: id > 0 });
            }
        }
    }



    render() {
        const {fetching, items} = this.props.photosState;
        return <main role="main">
            <h1>Photos</h1>
            <Toolbar className="m-b">
                <Link to="/photos/add">
                    <CreateButton text="Add photo"/>
                </Link>
            </Toolbar>
            {fetching && <h3>Loading...</h3>}
            {!fetching && <PhotoGallery photos={items.Values()} onPhotoClick={this.handlePhotoClick}/>}
            {this.renderDetails()}
        </main>;
    }

    private renderDetails() {
        const { items } = this.props.photosState;
        const { showModal, clickedId } = this.state;

        if(clickedId < 1) return null;

        const activePhoto: IPhoto = items.Get(clickedId.toString());
        if(activePhoto == null) return null;

        return <Modal title={activePhoto.title}
               show={showModal}
               handleClose={this.handleModalClose}
        >
                <FetchableImage
                    style={{maxWidth: '100%'}}
                    src={`${API_URL}/photos/${activePhoto.id}`}
                    alt={activePhoto.title}/>
                <AuditInfo entity={activePhoto}/>
                <ReactMarkdown source={activePhoto.description}/>
                <EntityReferences entity={activePhoto}/>
        </Modal>;
    }

    private handlePhotoClick(id: number) {
        this.setState({
            clickedId: id,
            showModal: true
        });
    }
    private handleModalClose() {
        this.setState({ showModal: false })
    }


}

const mapStateToProps = (state: IAppState) => ({
    photosState: state.photos
});
const mapDispatchToProps = (dispatch: Dispatch<FetchPhotosAction>) => ({
    fetchPhotos: () => dispatch(photoActions.fetchPhotos())
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);

