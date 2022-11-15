import { ITicket } from "@CHSUVladimir/otrs-connector";
import React from "react";
import styles from "../../Styles.module.scss";
import ShadowOTRSConnector from "../../OTRS/ShadowOTRSConnector";
import Close from "../../svg/Close";
import Articles from "./Articles";

export interface ITicketDialog{
    Ticket:ITicket;
    display:boolean; 
    onClose:()=>void;
}

export default class TicketDialog extends React.Component<ITicketDialog>{

    public render(): React.ReactNode {
        if(this.props.display){
            return (
                <div className={styles.maindialogBackground}>
                    <div className={styles.dialog}> 
                        <span className={styles.closeIcon} onClick={()=>this.props.onClose()}>
                            <Close/>
                        </span>
                        <div className={styles.ticketDialog}>
                            <h2>Заявка № {this.props.Ticket.TicketNumber}<br/>{this.props.Ticket.Title}</h2>
                            <div className={styles.ticketBody} >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{textAlign:"right"}}>Состояние заявки:</td>
                                            <td style={{paddingLeft:"0.75em"}}><b>{this.State()}</b></td>                            
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"right"}}>Создана:</td>
                                            <td style={{paddingLeft:"0.75em"}}>{this.CreatedDT}</td>                            
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"right"}}>Дата последнего изменения:</td>
                                            <td style={{paddingLeft:"0.75em"}}>{this.ChangedDT}</td>                            
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"right"}}>Очередь:</td>
                                            <td style={{paddingLeft:"0.75em"}}>{this.Queue()}</td>                            
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"right"}}></td>
                                            <td style={{paddingLeft:"0.75em"}}></td>                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <Articles TicketID={this.props.Ticket.TicketID}/>
                        </div>                       
                    </div>
                </div>
            );
        }else{
            return (
                <></>
            );
        }       
    }

    /**
     * @property Дата создания в формате дд.мм.гггг ЧЧ:ММ:СС
     */
     private get CreatedDT():string{
        let par = this.props.Ticket.Created.split(" ");
        let dar =par[0].split("-");
        return `${dar[2]}.${dar[1]}.${dar[0]} ${par[1]}`;
     }
 
     /**
      * @property Дата последнего изменения в формате дд.мм.гггг ЧЧ:ММ:СС
      */
     private get ChangedDT():string{
         let par = this.props.Ticket.Changed.split(" ");
         let dar =par[0].split("-");
         return `${dar[2]}.${dar[1]}.${dar[0]} ${par[1]}`;
     }

     /**
      * 
      * @returns текст статуса
      */
     private State():string{
        const s = ShadowOTRSConnector.StatusEncoder[this.props.Ticket.StateID];
        if(s){
            return s;
        }else{
            return this.props.Ticket.State;
        }
     }

     /**
      * 
      * @returns текст наименования очереди
      */
     private Queue():string{
        const s = ShadowOTRSConnector.Queues.find(m=>m.OTRSId===this.props.Ticket.QueueID);
        if(s){
            return s.Name;
        }else{
            return this.props.Ticket.Queue;
        }
     }
 
}