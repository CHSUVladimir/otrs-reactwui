import React from "react";
import { IHeaderSafe, IPreviewElement, IQueue, ISafeElement, ISafPreviewElement } from "../..";

export interface IHElement{
    Element:ISafeElement;
    Queue:IQueue;
}

export default class HElement extends React.Component<IHElement> implements ISafPreviewElement{
    
    public Safe():IPreviewElement{
        if(this.mainRef.current){
            return {
                Element:this.mainRef.current,
                beNormal:true
            };
        }else{
            throw new Error('elements not finded!')
        }
    }
   
   private mainRef = React.createRef<HTMLHeadingElement>();
    
   public render(): React.ReactNode {
        if(this.props.Element.Type==='h'){
            const el = this.props.Element.Parameters as IHeaderSafe;
            switch(el.HeaderLevel){
                case 1: return (
                    <h1 style={el.currentStyle} title={el.TitleText} ref={this.mainRef}>
                        {this.MainText()}
                    </h1>
                );
                case 2: return (
                    <h2 style={el.currentStyle} title={el.TitleText} ref={this.mainRef}>
                        {this.MainText()}
                    </h2>
                );
                case 3: return (
                    <h3 style={el.currentStyle} title={el.TitleText} ref={this.mainRef}>
                        {this.MainText()}
                    </h3>
                );
                case 4: return (
                    <h4 style={el.currentStyle} title={el.TitleText} ref={this.mainRef}>
                        {this.MainText()}
                    </h4>
                );
                case 5: return (
                    <h5 style={el.currentStyle} title={el.TitleText} ref={this.mainRef}>
                        {this.MainText()}
                    </h5>
                );
                case 6: return (
                    <h6 style={el.currentStyle} title={el.TitleText} ref={this.mainRef}>
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