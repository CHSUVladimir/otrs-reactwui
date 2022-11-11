import React from "react";
import { IInputToSafe, ISafeElement } from "../..";

export interface IInputElement{
    Element:ISafeElement;
}

export default class InputElement extends  React.Component<IInputElement>{

    public render(): React.ReactNode {
        if(this.props.Element.Type==='input'){
            const el =this.props.Element.Parameters as IInputToSafe;
            return (
                <input 
                    type={el.type}
                    required={el.required}
                    placeholder={el.placeholder}
                    name={el.name}
                    style={el.currentStyle}
                    title={el.TitleText}
                />
            );
        }else{
            <div>
                Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "input"
            </div>
        }
    }
}