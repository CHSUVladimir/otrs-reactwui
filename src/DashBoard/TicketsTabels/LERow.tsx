import { ITicket } from "@CHSUVladimir/otrs-connector";
import ReactDOM from 'react-dom/client';
import React from "react";
import ShadowOTRSConnector from "../../OTRS/ShadowOTRSConnector";
import Envelope from "../../svg/Envelope";
import TicketDialog from "./TicketDialog";

export interface ILERow{
    Ticket:ITicket;    
}

interface IState{
    dialogOpen:boolean;
    mRoot?:ReactDOM.Root;
}

export default class LERow extends React.Component<ILERow, IState>{

    public state: Readonly<IState>={
        dialogOpen:false
    };

    private rElement?:HTMLDivElement;

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
                        <Envelope color='#333333' style={{width:'1.25em', height:'1', marginRight:'0.25em'}}/> {this.CountArticles()}
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

    /**
     * 
     * @returns Количество заметок относящихся к заявке
     */
    private CountArticles():number|undefined{
        const t = this.props.Ticket;
        if(t.Article){
            if(t.Article.length){
                let res =t.Article?.filter(m=>m.IsVisibleForCustomer===1).length;
                if(res && res>1){
                    return res;
                }else{
                    return;
                }
            }else{
                return;
            }
        }else{
            return;
        }
    }

    componentDidMount(): void {
        this.ClearRoot();
        if(!this.state.mRoot){
            this.rElement = document.createElement('div');
            document.body.appendChild(this.rElement);
            this.rElement.style.width='0';
            this.rElement.style.height='0';
            this.rElement.style.display='inline-block';
            const root = ReactDOM.createRoot(this.rElement);
            this.setState({mRoot:root});
        }
    }

    componentWillUnmount(): void {
        if(this.state.mRoot){
            if(this.rElement){
                document.body.removeChild(this.rElement);
            }            
            this.state.mRoot.unmount();
        }
    }

    componentDidUpdate(prevProps: Readonly<ILERow>, prevState: Readonly<{ dialogOpen: boolean; }>, snapshot?: any): void {
        if(this.state.mRoot){
            this.state.mRoot.render(
                <React.StrictMode>
                    <TicketDialog display={this.state.dialogOpen}  Ticket={this.props.Ticket} onClose={()=>this.setState({dialogOpen:false})}/>
                </React.StrictMode>
            );
        }
    }
/**
 * Очистка элементов при монтаже
 */
    private ClearRoot():void{
        if(this.state.mRoot){
            this.state.mRoot.render(
                <React.StrictMode>                    
                </React.StrictMode>
            );
        }
    }
}