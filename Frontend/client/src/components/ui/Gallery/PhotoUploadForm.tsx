import * as React from 'react';
import '../../../../res/scss/img_upload.css'
import {ChangeEvent} from "react";
import {CancelButton} from "../Button/CancelButton";

export interface UploadFormProps {
    onSubmit: (file: File, title: string) => void;
    onCancel?: () => void;
}
type ComponentState = {
    file: File;
    imagePreviewUrl: string | ArrayBuffer;
    title: string;
}
export class PhotoUploadForm extends React.Component<UploadFormProps, ComponentState> {

    constructor(props: Readonly<UploadFormProps>) {
        super(props);

        this.state = {
            file: null,
            imagePreviewUrl: null,
            title: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { file, title } = this.state;
        this.props.onSubmit(file, title);
        this.setState({file: null, imagePreviewUrl: null});
    }

    handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        this.createDataImgUrl(e.target.files[0]);
    }

    private handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        this.createDataImgUrl(e.dataTransfer.files[0]);
    }

    private handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({title: e.target.value });
    }

    private createDataImgUrl(file: File) {
        const that = this;
        let reader = new FileReader();

        reader.onloadend = () => {
            that.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    render() {
        return (
            <div className="container-fluid column-left">
                <div className="col-md-10 col-lg-5 m-t-md">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Upload Image</label>
                            <div className="input-group">
                                <span className="input-group-btn">
                                    <span className="btn btn-default btn-file">
                                        Browse… <input type="file" onChange={this.handleImageChange}/>
                                    </span>
                                </span>
                                <input type="text" className="form-control" readOnly/>
                            </div>
                            <em>Max file size: 8MB</em>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Photo title</label>
                            <input type="text"
                                   required
                                   id="title"
                                   className="form-control"
                                   value={this.state.title}
                                   onChange={this.handleTitleChange}
                                   placeholder="Title..."/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-lg btn-primary m-r" id="upload-button" type="submit">
                                Upload image
                            </button>
                            <CancelButton size="lg" onClick={this.props.onCancel}/>
                        </div>
                        <div className="well-lg dropzone"
                            onDragOver={e=>e.preventDefault()}
                            onDrop={this.handleDrop}>
                            <h4>Drag and drop file here</h4>
                        </div>
                        <em>Max file size: 8MB</em>
                    </form>
                </div>
                <div className="col-md-10 col-lg-5 m-t-md">
                    <h4>Preview: </h4>
                    {this.state.imagePreviewUrl ?
                        <div className="imgPreview m-md">
                            <img src={this.state.imagePreviewUrl as string} className='img-upload'/>
                        </div>
                        : <p>Select image to see preview</p>
                    }
                </div>
            </div>
        );
    }

}

