import TicketIdsStore from "./TicketsIdsStore";

export default class TicketAllIdsStore extends TicketIdsStore{    

    /**
     * Загружает полный набор поданых заявок
     */
    override async Load():Promise<void>{        
        this.setAllSeachTerms();
        await this.LoadTicketIds();
    }
}