import { IArticle, ITicket, OTRSSession } from "@CHSUVladimir/otrs-connector";
import TicketGet from "@CHSUVladimir/otrs-connector/dist/esm/OTRS/TicketGet";
import React from "react";
import AwaitSpinner from "../../Elements/AwaitSpinner";
import styles from "../../Styles.module.scss";

export interface IArticles{
    TicketID:number;
}

interface IState{
    Load:boolean;
    Articles?:IArticle[];
}

export default class Articles extends React.Component<IArticles, IState>{

    public state: Readonly<IState>={
        Load:true
    };

    public render(): React.ReactNode {
        if(!this.state.Load){
            console.log(this.state.Articles);
            return (
                <div className={styles.ticketArticles}>
                {this.state.Articles?
                    this.state.Articles.map(a=>{
                        return (
                            <div key={'art_'+a.ArticleID}>
                                {a.ArticleID}
                                <br/>
                                {a.MimeType}
                            </div>
                        );
                    })
                :
                    <span>Здесь пока ничего нет!</span>
                }         
                </div>
            );
        }else{
            return (
                <div className={styles.ticketArticles}>
                    <AwaitSpinner/>        
                </div>
            );
        }
        
    }

    componentDidMount(): void {
       this.LoadArticles().then(); 
    }

    private async LoadArticles():Promise<void>{
        const tg = new TicketGet();
        const tc = tg.TicketConditions();
        tc.SessionID=OTRSSession.SessionId();
        tc.TicketID=this.props.TicketID;
        tc.AllArticles=true;    
        tc.DynamicFields=true;   
        tc.HTMLBodyAsAttachment=true; 
        tc.GetAttachmentContents=true;
        tc.Attachments=true;
        const res = await tg.GetTickets() as ITicket;
        if(res){
            const ar = res.Article;
            if(ar){
                if(ar.length){
                    this.setState({Load:false, Articles:ar});
                }else{
                    const art = ar as unknown as IArticle;
                    this.setState({Load:false, Articles:[art]});
                }
            }else{
                this.setState({Load:false, Articles:undefined});
            }
        }else{
            this.setState({Load:false, Articles:undefined});
        }
    }
}