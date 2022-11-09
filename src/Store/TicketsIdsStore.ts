import { OTRSSession, OTRSTicketSearch } from "@CHSUVladimir/otrs-connector";
import OTRSConnector from "../OTRS/OTRSConnector";
import Store from "./Store";

export default class TicketIdsStore extends Store<number>{

    private  ticketSearch = new OTRSTicketSearch();

    protected setAllSeachTerms():void{
        const st =this.ticketSearch.SearchTerms;   
        st.SessionID = OTRSSession.SessionId();  
        st.CustomerUserLogin =[OTRSConnector.Session.CustomerUserLogin];
        st.TypeIDs = OTRSConnector.StandartBids;
        st.Limit=10000;
    }

    protected setOpenSeachTerms():void{
        this.setAllSeachTerms();
        this.ticketSearch.SearchTerms.StateIDs =OTRSConnector.Settings.OpenTicketStates;
    }

    protected setSuccessSeachTerms():void{
        this.setAllSeachTerms();
        this.ticketSearch.SearchTerms.StateIDs =OTRSConnector.Settings.CloseTicketStates;
    }

    protected async LoadTicketIds():Promise<void>{
        const res = await this.ticketSearch.Search(); 
        const ar = res as number[];
        if(ar && ar.length){
            this.Buffer=ar;
            this.Updated();
        }else{
            const tid =res as number;
            if(!isNaN(tid)){
                this.Buffer=[tid];
                this.Updated();
            }else{
                this.Updated();
            }
        }
    }

    public Count():number{
        return this.Buffer.length;
    }
}