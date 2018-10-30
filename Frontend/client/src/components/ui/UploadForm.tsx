import * as React from 'react';
import '../../../res/scss/upload.css';
import {Button} from "./Button/Button";
import {CreateButton} from "./Button/CreateButton";
import {CancelButton} from "./Button/CancelButton";
import {DeleteButton} from "./Button/DeleteButton";

export class UploadForm extends React.Component<{}> {
    render() {
        return (
            <div className="container-fluid">
                <div id="actions" className="row">
                    <div className="col-lg-7">
                        <CreateButton text="Add files..."/>
                        <Button text="Start upload" type="primary" icon="upload"/>
                        <CancelButton onClick={null} text="Cancel upload" highlighted/>

                    </div>

                    <div className="col-lg-5">
                      <span className="fileupload-process">
                        <div id="total-progress" className="progress progress-striped active" role="progressbar"
                             aria-valuemin={0}
                             aria-valuemax={100} aria-valuenow={0}>
                          <div className="progress-bar progress-bar-success" style={{width: '0%'}}
                               data-dz-uploadprogress=""/>
                        </div>
                      </span>
                    </div>
                </div>
                <div className="table table-striped files" id="previews">
                    {this.renderRow()}
                </div>
            </div>
        );
    }

    private renderRow() {
        return (
            <div id="template" className="file-row dz-image-preview">
                <div>
                    <span className="preview"><img data-dz-thumbnail/></span>
                </div>
                <div>
                    <p className="name" data-dz-name/>
                    <strong className="error text-danger" data-dz-errormessage/>
                </div>
                <div>
                    <p className="size" data-dz-size/>
                    <div className="progress progress-striped active" role="progressbar" aria-valuemin={0}
                         aria-valuemax={0} aria-valuenow={0}>
                        <div className="progress-bar progress-bar-success" style={{width: '0%'}}
                             data-dz-uploadprogress/>
                    </div>
                </div>
                <div>
                    <Button text="Start" type="primary" icon="upload"/>
                    <CancelButton onClick={null} highlighted/>
                    <DeleteButton onClick={null}/>
                </div>
            </div>
        );
    }
}