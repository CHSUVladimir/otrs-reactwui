import React from "react";
import { ISafeElement, ITextAreaToSafe } from "../..";

export interface ITextAreaElement{
    Element:ISafeElement;
}

export default class TextAreaElement extends React.Component<ITextAreaElement>{

    public render(): React.ReactNode {
        if(this.props.Element.Type==='textarea'){
            const el = this.props.Element.Parameters as ITextAreaToSafe;
            return (
                <textarea 
                    placeholder={el.placeholder}
                    required={el.required}
                    style={el.currentStyle}
                    title={el.TitleText}                    
                ></textarea>
            );
        }else{
            return (<div>
                Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "textarea"
            </div>);
        }
        
    }
}