import React from "react";
import ReactDOM from "react-dom";

type PropsType = {
  isShowing: boolean;
  hide: any;
  children?: any;
};

const Modal = ({ isShowing, hide, children }: PropsType) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button px-5 py-2"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="h-screen">{children}</div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
