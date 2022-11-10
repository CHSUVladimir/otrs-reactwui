import TicketIdsStore from "./TicketsIdsStore";

export default class TicketsIdsTop5Store extends TicketIdsStore{

    override async Load():Promise<void>{        
        this.setTop5SeachTerms();
        await this.LoadTicketIds();
    }
    
}