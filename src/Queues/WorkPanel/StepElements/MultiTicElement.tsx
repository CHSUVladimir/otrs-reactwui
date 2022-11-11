import React from "react";
import styles from "../../../Styles.module.scss";
import { IQueue, ISafeElement, IxTickToSafe } from "../..";
import HElement from "./HElement";
import LabelElement from "./LabelElement";
import InputElement from "./InputElement";
import DivElement from "./DivElement";
import SelectElement from "./SelectElement";
import TextAreaElement from "./TextAreaElement";

export interface IMultiTicElement{
    Element:ISafeElement;
    Queue:IQueue;
}

interface IMultiTicElementState{
    count:number;
}

export default class MultiTicElement extends  React.Component<IMultiTicElement, IMultiTicElementState>{

    public state: Readonly<IMultiTicElementState>={
        count:1
    };

    public render(): React.ReactNode {
        if(this.props.Element.Type==='xTic'){
            return (
                <div style={{width:'100%', position:'relative', paddingBottom:'2em'}}>
                    {this.TicItems()}                
                    <div 
                        className={styles.button} 
                        style={{position:'absolute', right:'.25em', padding:'.5em', margin:'.5em', bottom:'.5em', top:'unset'}}
                        onClick={()=>this.setState({count:this.state.count+1})}
                    >+</div>
                </div>
            );
        }else{
            return (
                <div>
                    Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "xTic"
                </div>
            );
        }
        
    }

    private TicItems():JSX.Element[]{
        const res:JSX.Element[]=[];
        const el =this.props.Element.Parameters as IxTickToSafe;
        for(let i=0; i<this.state.count;i++){
            res.push(
                <div key={i} style={el.Parameters.currentStyle} title={el.Parameters.TitleText}>
                    <hr/>
                    {el.Elements.map((e,j)=>
                        {
                            switch(e.Type){
                                case 'h': return (<HElement Element={e} Queue={this.props.Queue} key={i+'_'+j+'_'+e.Type}/>);
                                case 'label': return (<LabelElement Element={e} key={i+'_'+j+'_'+e.Type}/>)
                                case 'input': return (<InputElement Element={e} key={i+'_'+j+'_'+e.Type}/>);
                                case 'div': return (<DivElement Element={e} Queue={this.props.Queue} key={i+'_'+j+'_'+e.Type}/>);
                                case 'select': return (<SelectElement Element={e} key={i+'_'+j+'_'+e.Type}/>);
                                case 'textarea': return(<TextAreaElement Element={e} key={i+'_'+j+'_'+e.Type}/>);
                                case 'xTic': return (<MultiTicElement Element={e} Queue={this.props.Queue} key={i+'_'+j+'_'+e.Type}/>)
                                
                                default: return (<span key={i+'_'+j+'_'+e.Type}> {e.Type} </span>);
                            }
                        })}
                </div>
            );
        }
        return res;
    }

}