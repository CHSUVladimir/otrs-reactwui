import React from "react";
import ReactDOM from 'react-dom/client';
import {Globals, DataType} from 'csstype';
import styles from '../../Styles.module.scss';
import Bar from "./Bar";
import TicketAdd from "./TicketAdd";
import QueueFrame from "../../Queues/QueueFrame";

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

interface IState{
    displayTicketAdd:boolean;
}

export default class  Menu extends React.Component<IMenu, IState>{
    public state: Readonly<IState>={
        displayTicketAdd:false,
    };


    public render(): React.ReactNode {
        return (
            <div className={styles.menu} style={{backgroundColor:this.props.MenuColor}}>
                <Bar color={this.props.ColorIcons?.Bar}/>
                <TicketAdd 
                    color={this.props.ColorIcons?.TicketAdd}
                    title='Добавить новую заявку'
                    onClick={()=>{this.setState({displayTicketAdd:true})}}
                />
            </div>
        );
        
    }

    componentDidMount(): void {
        this.ClearRoot();
    }

    componentDidUpdate(prevProps: Readonly<IMenu>, prevState: Readonly<{}>, snapshot?: any): void {
        if(this.props.mRoot){
            this.props.mRoot.render(
                <React.StrictMode>
                    <QueueFrame display={this.state.displayTicketAdd} onClose={()=>this.setState({displayTicketAdd:false})}/>
                </React.StrictMode>
            );
        }
    }

    private ClearRoot():void{
        if(this.props.mRoot){
            this.props.mRoot.render(<React.StrictMode></React.StrictMode>);
        }
    }
    
}