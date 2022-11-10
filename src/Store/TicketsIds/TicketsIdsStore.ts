import { OTRSSession, OTRSTicketSearch } from "@CHSUVladimir/otrs-connector";
import ShadowOTRSConnector from "../../OTRS/ShadowOTRSConnector";
import Store from "../Store";

export default class TicketIdsStore extends Store<number>{

    private  ticketSearch = new OTRSTicketSearch();

    protected setAllSeachTerms():void{
        const st =this.ticketSearch.SearchTerms;   
        st.SessionID = OTRSSession.SessionId();  
        st.CustomerUserLogin =[ShadowOTRSConnector.Session.CustomerUserLogin];
        st.TypeIDs = ShadowOTRSConnector.StandartBids;
        st.Limit=10000;
    }

    protected setOpenSeachTerms():void{
        this.setAllSeachTerms();
        this.ticketSearch.SearchTerms.StateIDs =ShadowOTRSConnector.Settings.OpenTicketStates;
    }

    protected setSuccessSeachTerms():void{
        this.setAllSeachTerms();
        this.ticketSearch.SearchTerms.StateIDs =ShadowOTRSConnector.Settings.CloseTicketStates;
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

    protected setTop5SeachTerms():void{
        this.setAllSeachTerms();        
        const st =this.ticketSearch.SearchTerms;  
        st.StateIDs=undefined;
        st.SortBy=["Changed"];
        st.Limit=5; 
        console.error("not implementation yet!");
    }

    public Count():number{
        return this.Buffer.length;
    }
}