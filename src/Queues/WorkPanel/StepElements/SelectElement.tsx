import React from "react";
import { ISafeElement, ISelectToSafe } from "../..";

export interface ISelectElement{
    Element:ISafeElement;
}

export default class SelectElement extends React.Component<ISelectElement>{

    public render(): React.ReactNode {
        if(this.props.Element.Type==='select'){
            const el= this.props.Element.Parameters as ISelectToSafe;
            return (
                <select 
                    style={el.currentStyle} 
                    required={el.required} 
                    placeholder={el.placeholder} 
                    defaultValue={el.defaultSelected?.value}   
                    title={el.TitleText}                 
                >
                    {el.Options.map((o,i)=>{                    
                    return (
                        <option 
                            key={o.text+"_"+o.value+"_"+i}
                            value={o.value}
                        >
                            {o.text}
                        </option>);
                    })}
                </select>
            );
        }else{
            <div>
                Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "select"
            </div>
        }
    }
}