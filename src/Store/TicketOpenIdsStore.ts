import TicketIdsStore from "./TicketsIdsStore";


export default class TicketOpenIdsStore extends TicketIdsStore{

    /**
     * Загружает данные идентификаторов открытых заявок
     */
    override async Load():Promise<void>{        
        this.setOpenSeachTerms();
        await this.LoadTicketIds();
    }
}