import React from "react";
import ReactDOM from 'react-dom/client';
import {Globals, DataType} from 'csstype';
import styles from '../../Styles.module.scss';
import Bar from "./Bar";
import TicketAdd from "./TicketAdd";

export type CssColor=Globals | DataType.Color;

export interface IColorIcon{
    Bar?:CssColor;
    TicketAdd?:CssColor;
}

export interface IMenu{
    mRoot:ReactDOM.Root;
    ColorIcons?:IColorIcon;
    MenuColor?:CssColor;
}

export default class  Menu extends React.Component<IMenu>{
    public render(): React.ReactNode {
        return (
            <div className={styles.menu} style={{backgroundColor:this.props.MenuColor}}>
                <Bar color={this.props.ColorIcons?.Bar}/>
                <TicketAdd 
                    color={this.props.ColorIcons?.TicketAdd}
                    title='Добавить новую заявку'
                />
            </div>
        );
        
    }

    componentDidMount(): void {
        this.ClearRoot();
    }

    componentDidUpdate(prevProps: Readonly<IMenu>, prevState: Readonly<{}>, snapshot?: any): void {
        this.ClearRoot();
    }

    private ClearRoot():void{
        if(this.props.mRoot){
            this.props.mRoot.render(<React.StrictMode></React.StrictMode>);
        }
    }
    
}