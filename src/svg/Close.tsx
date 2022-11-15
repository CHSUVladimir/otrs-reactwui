import React from "react";

export interface IClose{
    title?:string;
}

export default class Close extends React.Component<IClose>{

    public render(): React.ReactNode {
        return (
            <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <title>{this.props.title??"Закрыть"}</title>
                <path 
                    fill="black" 
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z
                    m121.6 313.1c4.7 4.7 4.7 12.3 0 17
                    L338 377.6c-4.7 4.7-12.3 4.7-17 0
                    L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0
                    L134.4 338c-4.7-4.7-4.7-12.3 0-17
                    l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0
                    l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0
                    l39.6 39.6c4.7 4.7 4.7 12.3 0 17
                    L312 256l65.6 65.1z
                    "
                ></path>
            </svg>
        );
    }
}