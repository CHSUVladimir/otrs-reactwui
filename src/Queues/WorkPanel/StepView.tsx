import React from "react";
import styles from "../../Styles.module.scss";
import { IQueue, IQueueForm, ISafeElement, ISafPreviewElement, setUpElement } from "..";

export interface IStepView{
    form:IQueueForm;
    Queue:IQueue;
    onBack:()=>void;
}

interface IState{
    Elements?:JSX.Element;
}

export default class StepView extends React.Component<IStepView, IState>{
    public state: Readonly<IState>={};

    private refsSPE:React.RefObject<ISafPreviewElement>[]=[];
    
    public render(): React.ReactNode {
        if(this.props.form.Steps[0].Type==='Step'){
            const Elements = this.props.form.Steps[0].Parameters as ISafeElement[];
            return (
                <div className={styles.step}>
                    {Elements.map((e,i)=>{
                        const ref=React.createRef<any>();
                        this.refsSPE.push(ref);
                        return setUpElement(e,this.props.Queue,i,ref);
                    })}
    
                    <div className={styles.button} onClick={()=>this.onBack()}>Назад</div>
                    <div className={styles.button} onClick={()=>this.onPreView()}>Предварительный просмотр</div>
                </div>
            );
        }else{
            return(
                <div>
                    <p>Объект не является шагом!</p>
                    <div className={styles.button} onClick={()=>this.onBack()}>Назад</div>
                </div>
            );
        }
    }

    private onBack():void{
        this.props.onBack();
    }

    private onPreView():void{
        this.refsSPE.forEach(r=>{
            if(r.current){
                console.log(r.current.Safe());
            }
        });
    }
}