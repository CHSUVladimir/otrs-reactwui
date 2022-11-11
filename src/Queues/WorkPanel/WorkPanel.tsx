import { IQueue, IQueueForm } from "..";
import React from "react";
import styles from "../../Styles.module.scss";
import ShadowOTRSConnector from "../../OTRS/ShadowOTRSConnector";
import QueueBranch from "./QueueBranch";
import StepView from "./StepView";




export interface IWorkPanel{

}

interface IWorkPanelState{
    form?:IQueueForm;
    Queue?:IQueue;
    BeforeSelected?:IQueue;
}

export default class WorkPanel extends React.Component<IWorkPanel, IWorkPanelState>{
    public state: Readonly<IWorkPanelState>={};

    public render(): React.ReactNode {
        if(this.state.form && this.state.Queue){
            const form = this.state.form;
            const queue=this.state.Queue;
            return (
                <div className={styles.workPanel} key={'workpanel'}>
                        <StepView form={form} Queue={queue} onBack={()=>this.setState({BeforeSelected:queue, form:undefined, Queue:undefined})} key={'stepView_'+form.QueueId}/>
                </div>
            );
        }else{
            return (
                <div className={styles.workPanel} key={'workpanel'}>
                    <h3 style={{textAlign:'center', width:"100%"}} key={'workpanelHeader'}>Выберите, пожалуйста, в каком направлении Вам необходима помощь</h3>
                    {
                        ShadowOTRSConnector.QueueTree.map(t=>{
                            return (
                                <QueueBranch 
                                    QueueTree={t} 
                                    onQFClick={(f,q)=>this.setState({form:f, Queue:q})} 
                                    key={'QueueBranch_'+t.QueueId} 
                                    BeforeSelected={this.state.BeforeSelected}
                                    beforeSelectedApr={()=>this.setState({BeforeSelected:undefined})}
                                />
                            );
                        })
                    }
                </div>
            );
        }
    }
}