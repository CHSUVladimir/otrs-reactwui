import React from "react";
import styles from '../../Styles.module.scss';
import { CssColor } from "../../svg";
import PlusCircle from "../../svg/PlusCircle";


export interface ITicketAdd{
    color?:CssColor;
    title?:string;
    onClick?:(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>any;
}

export default class TicketAdd extends React.Component<ITicketAdd>{

    public render(): React.ReactNode {
        return (
            <div className={styles.icon} title={this.props.title} onClick={this.props.onClick}>
                <PlusCircle color={this.props.color}/>
            </div>
        );
    }
}