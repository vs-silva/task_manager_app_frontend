import {MouseEvent} from "react";
import Eventbus from "../../eventbus";
import {EventTypeConstants} from "../../eventbus/event-type.constants";

export function TaskCreate(): JSX.Element {

    return (<>
        <button type="button"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    Eventbus.emit(EventTypeConstants.OPEN_MODAL);
                }}
                className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
        >Add new task</button>
    </>);
}
