import React from "react";
import styles from "../../Styles.module.scss";
import { IQueue, IQueueForm, ISafeElement } from "..";
import HElement from "./StepElements/HElement";
import LabelElement from "./StepElements/LabelElement";
import InputElement from "./StepElements/InputElement";
import DivElement from "./StepElements/DivElement";
import SelectElement from "./StepElements/SelectElement";
import TextAreaElement from "./StepElements/TextAreaElement";
import MultiTicElement from "./StepElements/MultiTicElement";

export interface IStepView{
    form:IQueueForm;
    Queue:IQueue;
    onBack:()=>void;
}

export default class StepView extends React.Component<IStepView>{
    
    public render(): React.ReactNode {
        if(this.props.form.Steps[0].Type==='Step'){
            const Elements = this.props.form.Steps[0].Parameters as ISafeElement[];
            return (
                <div className={styles.step}>
                    {Elements.map((e,i)=>{
                        switch(e.Type){
                            case 'h': return (<HElement Element={e} Queue={this.props.Queue} key={i+'_'+e.Type}/>);
                            case 'label': return (<LabelElement Element={e} key={i+'_'+e.Type}/>)
                            case 'input': return (<InputElement Element={e} key={i+'_'+e.Type}/>);
                            case 'div': return (<DivElement Element={e} Queue={this.props.Queue} key={i+'_'+e.Type}/>);
                            case 'select': return (<SelectElement Element={e} key={i+'_'+e.Type}/>);
                            case 'textarea': return(<TextAreaElement Element={e} key={i+'_'+e.Type}/>);
                            case 'xTic': return (<MultiTicElement Element={e} Queue={this.props.Queue} key={i+'_'+e.Type}/>)
                            
                            default: return (<span key={i+'_'+e.Type}> {e.Type} </span>);
                        }

                    })}
    
                    <div className={styles.button} onClick={()=>this.onBack()}>Назад</div>
                    <div className={styles.button}>Сохранить</div>
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
}