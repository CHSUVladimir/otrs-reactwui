import { ITicket, OTRSSession } from "@CHSUVladimir/otrs-connector";
import TicketGet from "@CHSUVladimir/otrs-connector/dist/esm/OTRS/TicketGet";
import React from "react";
import ReactDOM from 'react-dom/client';
import AwaitSpinner from "../../Elements/AwaitSpinner";
import ShadowOTRSConnector from "../../OTRS/ShadowOTRSConnector";
import StoryManager from "../../Store/0AStoryManager";
import styles from '../../Styles.module.scss';
import LERow from "./LERow";

export interface ITop5LastEdited{
    mRoot:ReactDOM.Root;
}

interface IState{
    Await:boolean; 
    Tickets:ITicket[];
}

export default class Top5LastEdited extends React.Component<ITop5LastEdited, IState>{

    public state: Readonly<IState>={
        Await:true,
        Tickets:[]
    };

    private static subscribeName:Readonly<string>='Top5LastEdited';

    public render(): React.ReactNode {
        if(!this.state.Await){
            if(this.state.Tickets && this.state.Tickets.length>0){
                return (
                    <div className={styles.col}>
                        <div className={styles.header}>Недавно измененные</div>
                        <table>
                            <thead>
                                <tr>
                                    <th >
                                        Дата последнего изменения
                                    </th>
                                    <th>
                                        Тема
                                    </th>
                                    <th>
                                        Состояние
                                    </th>                   
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Tickets.map(t=>{
                                        return (
                                            <LERow Ticket={t} mRoot={this.props.mRoot} key ={"TicketLE_"+t.TicketID}/>                                            
                                        );
                                    }
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                );
            }else{
                return (
                    <div className={styles.col}>
                        <div className={styles.header}>Недавно измененные</div>
                        <table>
                            <thead>
                                <tr>
                                    <th >
                                        Дата последнего изменения
                                    </th>
                                    <th>
                                        Тема
                                    </th>
                                    <th>
                                        Состояние
                                    </th>                   
                                </tr>
                            </thead>
                            <tbody>
                            <tr >
                                <td colSpan={3}>Данные отсутсвуют, либо не корректно подключение!</td>                
                            </tr>
                            </tbody>
                        </table>
                    </div>
                );
            }
        }else{
            return (
                <div className={styles.lastBids}>
                    <AwaitSpinner/>
                </div>
            );
        }
    }

    componentDidMount(): void {
        this.LoadData().then();
    }

    componentWillUnmount(): void {
        const man = StoryManager.TicketsIds.TicketTop5Ids;
        if(!man.NameIsUniqeSubUpd(Top5LastEdited.subscribeName)){
            man.UnSubscribeToUpdate(Top5LastEdited.subscribeName);
        }
    }

    private async LoadData():Promise<void>{
        const man = StoryManager.TicketsIds.TicketTop5Ids;
        if(man.FirstLoadStarted){
            await this.LoadTickets();            
        }else{
            await man.FirstLoad();
            await this.LoadTickets();
        }
        if(man.NameIsUniqeSubUpd(Top5LastEdited.subscribeName)){
            man.SubscribeToUpdate(Top5LastEdited.subscribeName, ()=>this.LoadTickets().then());
        }
    }

    private async LoadTickets(){
        const ltid = this.state.Tickets.map(t=>t.TicketID);
        const man = StoryManager.TicketsIds.TicketTop5Ids;
        let contains = ltid.length===man.Buffer.length;
        ltid.forEach(t=>{
            if(contains){
                const ind = ltid.indexOf(t);
                contains=man.Buffer[ind]===t;
            }
        });
        if(!contains){
            const tg = new TicketGet();
            const tc = tg.TicketConditions();
            tc.SessionID=OTRSSession.SessionId();
            tc.CustomerUserLogin=[ShadowOTRSConnector.Session.CustomerUserLogin];
            tc.TicketID=man.Buffer;
            tc.AllArticles=true; 
            const res = await tg.GetTickets();
            const ar = res as ITicket[];
            if(ar && ar.length){
                this.setState(
                    {
                        Await:false,
                        Tickets:ar
                    }
                );
            }else{
                const t = res as ITicket;
                if(t && t.TicketID){
                    this.setState(
                        {
                            Await:false,
                            Tickets:[t]
                        }
                    );
                }else{
                    this.setState(
                            {
                                Await:false,
                                Tickets:[]
                            }
                        );
                }
            }
        }else{
            this.setState({Await:false});
        }
    }

}