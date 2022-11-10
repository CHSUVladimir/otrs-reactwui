import AdversmentManagment from "./AdversmentIds/AdversmentManagment";
import TicketIdsManager from "./TicketsIds/TicketIdsManager";

export default class StoryManager{
    /** Управление идентификаторами заявок */
    public static TicketsIds = TicketIdsManager;
    /** Управление Объявлениями*/
    public static Adversment = AdversmentManagment;   
}