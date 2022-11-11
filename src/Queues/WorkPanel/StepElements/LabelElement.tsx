import React from "react";
import { ILabelToSafe, ISafeElement } from "../..";


export interface ILabelElement{
    Element:ISafeElement;
}

export default class LabelElement extends  React.Component<ILabelElement>{

    public render(): React.ReactNode {
        if(this.props.Element.Type==='label'){
            const el =this.props.Element.Parameters as ILabelToSafe;
            return (<label style={el.currentStyle} title={el.TitleText} aria-required={el.required?true:undefined}>
                {el.mainText}
            </label>);
        }else{
           return (<div>
                Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "label"
            </div>);
        }
    }
}