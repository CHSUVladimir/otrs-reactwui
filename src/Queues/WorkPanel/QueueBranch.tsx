import React from "react";
import styles from "../../Styles.module.scss";
import ShadowOTRSConnector from "../../OTRS/ShadowOTRSConnector";
import { IQueue, IQueueForm, IQueueTree } from "..";
import QueueButton from "./QueueButton";

export interface IQueueBranch{
    QueueTree:IQueueTree;
    onQFClick:(F:IQueueForm, Q:IQueue)=>void;
    BeforeSelected?:IQueue;
    beforeSelectedApr:()=>void;
}

interface IQBState{
    open:boolean;
}

export default class QueueBranch extends React.Component<IQueueBranch, IQBState>{
    state: Readonly<IQBState>={
        open:this.Opened()
    };

    public render(): React.ReactNode {
        const q =ShadowOTRSConnector.Queues.find(m=>m.Id===this.props.QueueTree.QueueId);
        return (
            <div key={'branch_'+this.props.QueueTree.QueueId} className={styles.branch} title={q?.Title}>
                <div className={styles.button} onClick={()=>this.setState({open:!this.state.open})} key={'b_'+this.props.QueueTree.QueueId}>{this.state.open?'-':'+'}</div>
                <span key={'spanName_'+this.props.QueueTree.QueueId}>{q?.Name??'not find'+this.props.QueueTree.QueueId}</span>
                {this.subElements().map(e=>e)}
            </div>
        );
    }
    /**
     * 
     * @returns Набор под элементов для отображения
     */
    private subElements():JSX.Element[]{
        var res:JSX.Element[]=[];
        if(this.state.open){
            this.props.QueueTree.Childrens.forEach(m=>{
                if(m.Childrens && m.Childrens.length>0){
                    res.push(
                        <QueueBranch 
                            QueueTree={m} 
                            key={'QueueBranch_'+m.QueueId} 
                            onQFClick={(f, q)=>this.props.onQFClick(f,q)} 
                            BeforeSelected={this.props.BeforeSelected}
                            beforeSelectedApr={this.props.beforeSelectedApr}
                        />
                    );
                }
                if(m.Forms && m.Forms.length>0){
                    m.Forms.forEach(f=>{
                        res.push(
                            <QueueButton Form={f}  key={'queueButton_'+f.QueueId} onClick={(f,q)=>this.props.onQFClick(f,q)} />
                        );
                    })
                }
               
            })
        }else{
            res.push(<></>);
        }
        return res;
    }

    /**
     * 
     * @returns Выбрана ли текущая ветвь или нет
     */
    private Opened():boolean{
        if(this.props.BeforeSelected){
            const bs = this.props.BeforeSelected;
            const res = this.findInBrunch(this.props.QueueTree, bs);
            this.props.beforeSelectedApr();
            return res;
        }else{
            return false;
        }
    }

    /**
     * Проверка наличия очереди внутри ветки дерева
     * @param QueueTree ветка дерева где ведется поиск
     * @param BeforeSelected ранее выбранная очередь
     * @returns есть ли в наличии в текущей ветке выбранная очередь
     */
    private findInBrunch( QueueTree:IQueueTree, BeforeSelected:IQueue):boolean{
        if(QueueTree.QueueId===BeforeSelected.Id){
            return true;
        }else{
            if(QueueTree.Childrens && QueueTree.Childrens.length>0){
                let find=false;
                QueueTree.Childrens.forEach(q=>{
                    if(!find){
                        find= find || this.findInBrunch(q, BeforeSelected);
                    }
                });
                return find;
            }else{
                return false;
            }
        }

    }
          
}