import React, { HTMLInputTypeAttribute } from "react";
import ReactDOM from 'react-dom/client';
import DivElement from "./WorkPanel/StepElements/DivElement";
import HElement from "./WorkPanel/StepElements/HElement";
import InputElement from "./WorkPanel/StepElements/InputElement";
import LabelElement from "./WorkPanel/StepElements/LabelElement";
import MultiTicElement from "./WorkPanel/StepElements/MultiTicElement";
import SelectElement from "./WorkPanel/StepElements/SelectElement";
import TextAreaElement from "./WorkPanel/StepElements/TextAreaElement";

export interface IQueue{
    Id:number;
    OTRSId:number;
    Name:string;
    Title:string;
    ParentId?:number;
    Query:string;
}

export interface IDivToSafe{
    Elements:ISafeElement[];
    Parameters:{
        currentStyle:React.CSSProperties;
        TitleText?:string;
    }
}

export interface IHeaderSafe{
    mainText:string;    
    currentStyle?:React.CSSProperties;
    HeaderLevel:number;
    TitleText?:string;
}

export interface IInputToSafe{
    placeholder:string;
    required:boolean;
    type:HTMLInputTypeAttribute;
    currentStyle?:React.CSSProperties;
    TitleText?:string;   
    name?:string;
}

export interface ILabelToSafe{
    mainText:string;    
    required:boolean;
    currentStyle?:React.CSSProperties;
    TitleText?:string;
}

export interface ISelectOption{
    text:string; 
    value?:string|number;
}

export interface ISelectToSafe{
    placeholder:string;
    required:boolean;
    Options:ISelectOption[];
    currentStyle?:React.CSSProperties;
    TitleText?:string;  
    defaultSelected?:ISelectOption;  
}

export interface ITextAreaToSafe{
    placeholder:string;
    required:boolean;
    currentStyle?:React.CSSProperties;
    TitleText?:string;
}

export interface IxTickToSafe{
    Elements:ISafeElement[];
    Parameters:{
        currentStyle?:React.CSSProperties;
        TitleText?:string;
    }
}

export type PrimitiveType='h'|'input'|'select'|'textarea'|'texteditor'|'label'|'div'|'xTic'|'xSample'
export type ElementsType = PrimitiveType | 'Step';
export type Parameters=ISafeElement[]|IHeaderSafe|ILabelToSafe|IInputToSafe|ISelectToSafe|ITextAreaToSafe|IDivToSafe|IxTickToSafe;

export interface IPanelState{
    Elements:JSX.Element[];
    ChildrensRefs:React.RefObject<IElementToSafe>[];
}

export interface IPanel{
    sRef:React.RefObject<HTMLDivElement>;
}

export interface IPanelProps{
    QNInput:React.RefObject<HTMLInputElement>;
    QNumber:number;
    dialogRoot:ReactDOM.Root;
}


export interface ISafeElement{
    Type:ElementsType;
    Parameters:Parameters;
}

export interface IElementToSafe{
    safe:()=>ISafeElement;
}


export interface IQueueForm{
    QueueId:number;
    Steps:ISafeElement[];
}

export interface IStep{
    StepId:string;
    Controls:HTMLElement[];
    NextStepId:string;
}

export interface IQueueTree{
    QueueId:number;
    Childrens:IQueueTree[];
    Forms?:IQueueForm[];
}

export interface IPreviewElement{
    Element:HTMLElement;
    beNormal:boolean;
}

export interface ISafPreviewElement{
    Safe:()=>IPreviewElement;
}

export function setUpElement(e:ISafeElement, Queue:IQueue, i:number, ref:React.RefObject<any>){
    switch(e.Type){
        case 'h': return (<HElement Element={e} Queue={Queue} key={i+'_'+e.Type} ref={ref}/>);
        case 'label': return (<LabelElement Element={e} key={i+'_'+e.Type} ref={ref}/>)
        case 'input': return (<InputElement Element={e} key={i+'_'+e.Type} ref={ref}/>);
        case 'div': return (<DivElement Element={e} Queue={Queue} key={i+'_'+e.Type} ref={ref}/>);
        case 'select': return (<SelectElement Element={e} key={i+'_'+e.Type}/>);
        case 'textarea': return(<TextAreaElement Element={e} key={i+'_'+e.Type}/>);
        case 'xTic': return (<MultiTicElement Element={e} Queue={Queue} key={i+'_'+e.Type}/>)
        
        default: return (<span key={i+'_'+e.Type}> {e.Type} </span>);
    }
}