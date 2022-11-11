import React from "react";
import styles from "../../Styles.module.scss";
import ShadowOTRSConnector from "../../OTRS/ShadowOTRSConnector";
import { IQueue, IQueueForm } from "..";

export interface IQueueButton{
    Form:IQueueForm;
    onClick:(F:IQueueForm, Q:IQueue)=>void;
}

export default class QueueButton extends React.Component<IQueueButton>{

    render(): React.ReactNode {
        const q =ShadowOTRSConnector.Queues.find(m=>m.Id===this.props.Form.QueueId)??{} as IQueue;
        return(
            <div title={q?.Title} className={styles.queueButton} onClick={()=>this.props.onClick(this.props.Form, q)}>
                {q?.Name}
            </div>
        );
    }
}