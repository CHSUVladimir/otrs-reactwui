import React from "react";
import { IHeaderSafe, IQueue, ISafeElement } from "../..";

export interface IHElement{
    Element:ISafeElement;
    Queue:IQueue;
}

export default class HElement extends  React.Component<IHElement>{
    public render(): React.ReactNode {
        if(this.props.Element.Type==='h'){
            const el = this.props.Element.Parameters as IHeaderSafe;
            switch(el.HeaderLevel){
                case 1: return (
                    <h1 style={el.currentStyle} title={el.TitleText}>
                        {this.MainText()}
                    </h1>
                );
                case 2: return (
                    <h2 style={el.currentStyle} title={el.TitleText}>
                        {this.MainText()}
                    </h2>
                );
                case 3: return (
                    <h3 style={el.currentStyle} title={el.TitleText}>
                        {this.MainText()}
                    </h3>
                );
                case 4: return (
                    <h4 style={el.currentStyle} title={el.TitleText}>
                        {this.MainText()}
                    </h4>
                );
                case 5: return (
                    <h5 style={el.currentStyle} title={el.TitleText}>
                        {this.MainText()}
                    </h5>
                );
                case 6: return (
                    <h6 style={el.currentStyle} title={el.TitleText}>
                        {this.MainText()}
                    </h6>
                );
                 default: return(<div>h{el.HeaderLevel} - {this.MainText()}</div>)
            }
        }else{
            return (
                <div>
                    Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "h"
                </div>
            );
        }        
    }

    private MainText():string{
        const el = this.props.Element.Parameters as IHeaderSafe;
        if(el.mainText){
            let res = el.mainText;
            if(res.includes('|QN|')){
                if(this.props.Queue){
                    const qs = this.props.Queue;
                    if(qs){
                        res=res.replace('|QN|',qs.Name);                        
                    }
                }                                 
            }
            
            return res;
        }else{
            return 'Заголовок';
        }
    }
}