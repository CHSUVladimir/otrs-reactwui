import React from "react";
import { CssColor } from ".";


export interface IPlusCircle{
    color?:CssColor;
}

export default class PlusCircle extends React.Component<IPlusCircle>{

    public render(): React.ReactNode {
        return (
            <svg style={{width:"100%"}} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
	                <path d="M256 8C119 8 8 119 8 256C8 393 119 504 256 504C393 504 504 393 504 256C504 119 393 8 256 8Z
			                 M400 284C400 290.6 394.6 296 388 296H296V388C296 394.6 290.6 400 284 400H228C221.4 400 216 394.6 216 388V296H124C117.4 296 112 290.6 112 284V228C112 221.4 117.4 216 124 216H216V124C216 117.4 221.4 112 228 112H284C290.6 112 296 117.4 296 124V216H388C394.6 216 400 221.4 400 228V284Z" 
			            fill={this.props.color?this.props.color:"#fff"}
			        />
            </svg>
        );
    }
}