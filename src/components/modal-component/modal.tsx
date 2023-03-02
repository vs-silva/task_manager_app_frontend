import Eventbus from "../../eventbus";
import {EventTypeConstants} from "../../eventbus/event-type.constants";
import {MouseEvent} from "react";

export function Modal(props: {showModal: boolean, children: JSX.Element}) {

    const {showModal, children} = props;

    function closeModal(event: MouseEvent):void {
        event.stopPropagation();
        Eventbus.emit(EventTypeConstants.CLOSE_MODAL);
    }

    if( !showModal) {
        return (<></>)
    }

    return(<div id="modal_background" className="custom-modal-background" onClick={closeModal}>
        <div id="modal_body" onClick={event => event.stopPropagation()} className="custom-modal-body">
            <button type="button"
                    onClick={closeModal}
                    className="text-gray-600 hover:text-gray-900 font-medium rounded-lg text-sm text-center mb-2"
            >X</button>
            {children}
        </div>
    </div>)
}
