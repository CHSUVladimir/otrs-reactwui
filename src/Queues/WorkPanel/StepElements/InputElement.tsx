import React from "react";
import { IInputToSafe, IPreviewElement, ISafeElement, ISafPreviewElement } from "../..";

export interface IInputElement{
    Element:ISafeElement;
}

export default class InputElement extends  React.Component<IInputElement> implements ISafPreviewElement{
    public Safe():IPreviewElement{
        this.createSpan();
        if(this.mainPVRef.current){
            return {
                beNormal:this.mayBeSafe(),
                Element:this.mainPVRef.current
            } as IPreviewElement;
        }else{
            throw new Error('element not finded!')
        }
        
    }

    private mainRef = React.createRef<HTMLInputElement>();

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
                    ref={this.mainRef}
                />
            );
        }else{
            <div>
                Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "input"
            </div>
        }
    }

    private mayBeSafe():boolean{

        if(this.props.Element.Type==='input'){
            const el =this.props.Element.Parameters as IInputToSafe;
            if(el.required){
                if(this.mainRef.current){
                    const val = this.mainRef.current.value;
                    this.mainRef.current.setCustomValidity("");
                    switch(el.type){
                        case 'number':{
                            if(!isNaN(this.mainRef.current.valueAsNumber)){
                                return true;
                            }else{
                                this.mainRef.current.setCustomValidity("В поле должно быть введено число!")
                                return false;
                            }
                        }
                        case 'checkbox':
                        case 'email': {
                            if(val && val.length>3 && val.indexOf('@')>-1){
                                return true;
                            }else{
                                this.mainRef.current.setCustomValidity('В поле должно быть не мене 3-х символов  и являться email!');
                                return false;
                            }
                        }
                                

                        default: {
                            if(val && val.length>3){
                                return true;
                            }else{
                                this.mainRef.current.setCustomValidity("В поле должно быть не мене 3-х символов")
                                return false;
                            }
                        }
                    }
                    
                }else{
                    return false;
                }
            }else{
                return true;
            }
        }else{
            throw new Error('Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "input"');
        }
    }

    private mainPVRef = React.createRef<HTMLSpanElement>();

    private createSpan(){
        if(this.mainRef.current){
            const el =this.props.Element.Parameters as IInputToSafe;
            return (
                <span ref={this.mainPVRef} style={el.currentStyle}>
                    {this.mainRef.current.value}
                </span>
            );
        }else{
            throw new Error('element not finded!')
        }
    }
}