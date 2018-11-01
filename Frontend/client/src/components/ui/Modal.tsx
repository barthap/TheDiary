import * as React from 'react';
import '../../../res/scss/modal.scss'

export interface ModalProps {
    handleClose: () => void;
    handleSave?: () => void;
    show: boolean;
    title: string
}
export const Modal: React.SFC<ModalProps> = (props) => {
    const { handleClose, show, children, title, handleSave } = props;
    const showHideClassName = show ? "display-block" : "display-none";

    return (
        <div className={`modal ${showHideClassName}`}>
                <section className="modal-main" role="dialog">
                    <div className="modal-dialog  modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">{title}</h4>
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={handleClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    );
};