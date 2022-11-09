import TicketIdsStore from "./TicketsIdsStore";


export default class TicketSuccessIdsStore extends TicketIdsStore{

    override async Load():Promise<void>{
        this.setSuccessSeachTerms();
        await this.LoadTicketIds();
    }
}