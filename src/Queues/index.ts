import { HTMLInputTypeAttribute } from "react";
import ReactDOM from 'react-dom/client';

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