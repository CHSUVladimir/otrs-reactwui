import { IArticle, ITicket, OTRSSession } from "@CHSUVladimir/otrs-connector";
import TicketGet from "@CHSUVladimir/otrs-connector/dist/esm/OTRS/TicketGet";
import React from "react";
import AwaitSpinner from "../../Elements/AwaitSpinner";
import Pagination from "../../Elements/Pagination";
import styles from "../../Styles.module.scss";
import ArticleView from "./ArticleView";

export interface IArticles{
    TicketID:number;
}

interface IState{
    Load:boolean;
    Articles?:IArticle[];
    curentArticle?:IArticle;
}

export default class Articles extends React.Component<IArticles, IState>{

    public state: Readonly<IState>={
        Load:true
    };

    

    public render(): React.ReactNode {
        if(!this.state.Load){            
            return (
                <div className={styles.ticketArticles}>
                {this.state.curentArticle?
                    <ArticleView Article={this.state.curentArticle}/>
                :
                    <span>Здесь пока ничего нет!</span>
                }    
                <Pagination 
                    Elements={this.state.Articles} 
                    MaxPages={5}
                    onSelect={(v)=>this.setState({curentArticle:v})}
                    className={styles.pagination}
                    pageClass={styles.paginationPage}
                    pageOnSelectedClass={styles.active}
                />     
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

    /**
     * @async загрузка заявки со всеми данными
     */
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
            let ar = res.Article;
            if(ar){
                if(ar.length){
                    ar=ar.filter(m=>m.IsVisibleForCustomer===1);
                    this.setState({Load:false, Articles:ar, curentArticle:ar[0]});
                }else{
                    const art = ar as unknown as IArticle;
                    if(art.IsVisibleForCustomer===1){
                        this.setState({Load:false, Articles:[art], curentArticle:art});
                    }else{
                        this.setState({Load:false, Articles:undefined, curentArticle:undefined});
                    }
                    
                }
            }else{
                this.setState({Load:false, Articles:undefined, curentArticle:undefined});
            }
        }else{
            this.setState({Load:false, Articles:undefined, curentArticle:undefined});
        }
    }
}