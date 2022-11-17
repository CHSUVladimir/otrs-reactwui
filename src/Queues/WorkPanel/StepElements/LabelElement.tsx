import React from "react";
import { ILabelToSafe, IPreviewElement, ISafeElement, ISafPreviewElement } from "../..";


export interface ILabelElement{
    Element:ISafeElement;
}

export default class LabelElement extends  React.Component<ILabelElement> implements ISafPreviewElement{
    public Safe():IPreviewElement{
        if(this.mainRef.current){
            return {
                Element:this.mainRef.current,
                beNormal:true
            }
        }else{
            throw new Error('elements not finded!');
        }
    }
    
    private mainRef = React.createRef<HTMLLabelElement>();

    public render(): React.ReactNode {
        if(this.props.Element.Type==='label'){
            const el =this.props.Element.Parameters as ILabelToSafe;
            return (<label style={el.currentStyle} title={el.TitleText} aria-required={el.required?true:undefined} ref={this.mainRef}>
                {el.mainText}
            </label>);
        }else{
           return (<div>
                Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "label"
            </div>);
        }
    }
}