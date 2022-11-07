import React from "react";
import ReactDOM from 'react-dom/client';
import {Globals, DataType} from 'csstype';

export type CssColor=Globals | DataType.Color;

export interface IColorIcon{
    Bar?:CssColor;
    TicketAdd?:CssColor;
}

export interface IMenu{
    mRoot:ReactDOM.Root;
    ColorIcons?:IColorIcon;
}