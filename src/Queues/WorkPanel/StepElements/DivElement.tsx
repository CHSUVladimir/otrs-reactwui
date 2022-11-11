import React from "react";
import { IDivToSafe, IQueue, ISafeElement } from "../..";
import HElement from "./HElement";
import InputElement from "./InputElement";
import LabelElement from "./LabelElement";
import MultiTicElement from "./MultiTicElement";
import SelectElement from "./SelectElement";
import TextAreaElement from "./TextAreaElement";

export interface IDivElement{
    Element:ISafeElement;
    Queue:IQueue;
}

export default class DivElement extends  React.Component<IDivElement>{

    public render(): React.ReactNode {
        if(this.props.Element.Type==='div'){
            const el = this.props.Element.Parameters as IDivToSafe;
            return (
                <div style={el.Parameters.currentStyle} title={el.Parameters.TitleText}>
                    {
                        el.Elements.map((e,i)=>{
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
                        })
                    }
                </div>
            );
        }else{
            <div>
                Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "div"
            </div>
        }
    }
}