import * as React from 'react';
import {PhotoUploadForm} from "../ui/Gallery/PhotoUploadForm";
import {Dispatch} from "redux";
import {AddPhotoAction, photoActions} from "../../actions/photo.actions";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {IAppState} from "../../reducers";

type ReduxInjectedProps = {
    isCrudPending: boolean
    uploadPhoto: (file: File, title: string) => void;
}
type PageProps = ReduxInjectedProps & RouteComponentProps;
class AddPhotoPage extends React.Component<PageProps> {

    constructor(props: Readonly<PageProps>) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        return (
            <main>
                <h1>Upload new photo</h1>
                {this.props.isCrudPending && <h3>Uploading...</h3>}
                <PhotoUploadForm onSubmit={this.handleSubmit} onCancel={this.handleCancel}/>
            </main>
        );
    }

    private handleSubmit(file: File, title: string) {
        //this.props.history.goBack();
        this.props.uploadPhoto(file, title);
    }

    private handleCancel() {
        this.props.history.goBack();
    }
}


const mapStateToProps = (state: IAppState) => ({
    isCrudPending: state.photos.isCrudPending
});
const mapDispatchToProps = (dispatch: Dispatch<AddPhotoAction>) => ({
    uploadPhoto: (file: File, title: string) => dispatch(photoActions.addPhoto(file, title))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddPhotoPage);