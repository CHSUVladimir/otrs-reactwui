import { ITicket } from "@CHSUVladimir/otrs-connector";
import ReactDOM from 'react-dom/client';
import React from "react";
import ShadowOTRSConnector from "../../OTRS/ShadowOTRSConnector";
import Envelope from "../../svg/Envelope";
import TicketDialog from "./TicketDialog";

export interface ILERow{
    Ticket:ITicket;
    mRoot:ReactDOM.Root;
}

interface IState{
    dialogOpen:boolean;
}

export default class LERow extends React.Component<ILERow, IState>{

    public state: Readonly<{ dialogOpen: boolean; }>={
        dialogOpen:false
    };

    public render(): React.ReactNode {
        const t = this.props.Ticket;

        return (
            <tr
                style={{fontWeight:this.TicketBeOpen()?"bold":"unset"}}
                onClick={()=>this.setState({dialogOpen:true})}
            >
                <td>{this.DateCreate()}</td>
                <td>{t.Title}</td>
                <td style={{textAlign:'center'}}>
                    {this.TicketBeOpen()?"Открыта":"Закрыта"}
                    <br/>
                    <span style={{width:'100%', height:'1.25em', display:'flex', lineHeight:'1.25em', justifyContent:'center'}}>
                        <Envelope color='#333333' style={{width:'1.25em', height:'1', marginRight:'0.25em'}}/> {t.Article?.filter(m=>m.IsVisibleForCustomer===1).length}
                    </span>
                </td>
            </tr>
        );
    }

    /**
     * 
     * @returns {boolean} Является ли заявка открытой
     */
    private TicketBeOpen():boolean{
        const t = this.props.Ticket;
        const tss = t.StateID+'';
        const f =ShadowOTRSConnector.Settings.OpenTicketStates.find(m=>m===tss);
        if(f){
            return true;
        }else{
            return false;
        }
    }

    /**
     * 
     * @returns {string} Дата последненго изменения в формате ДД.ММ.гггг ЧЧ:мм:сс
     */
    private DateCreate():string{
        const t = this.props.Ticket;
        let par = t.Changed.split(" ");
        let dar =par[0].split("-");
        return `${dar[2]}.${dar[1]}.${dar[0]} ${par[1]}`;
    }

    componentDidMount(): void {
        this.ClearRoot();
    }

    componentDidUpdate(prevProps: Readonly<ILERow>, prevState: Readonly<{ dialogOpen: boolean; }>, snapshot?: any): void {
        if(this.props.mRoot){
            this.props.mRoot.render(
                <React.StrictMode>
                    <TicketDialog display={this.state.dialogOpen}  Ticket={this.props.Ticket} onClose={()=>this.setState({dialogOpen:false})}/>
                </React.StrictMode>
            );
        }
    }

    private ClearRoot():void{
        if(this.props.mRoot){
            this.props.mRoot.render(
                <React.StrictMode>                    
                </React.StrictMode>
            );
        }
    }
}