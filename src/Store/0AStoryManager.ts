import AdversmentToDayIdsStore from "./AdversmentIds/AdversmentToDayIdsStore";
import AdversmentToWeekIdsStore from "./AdversmentIds/AdversmentToWeekIdsStore";
import TicketAllIdsStore from "./TicketsIds/TicketAllIdsStore";
import TicketOpenIdsStore from "./TicketsIds/TicketOpenIdsStore";
import TicketSuccessIdsStore from "./TicketsIds/TicketSuccessIdsStore";

export default class StoryManager{
    /** Все идентификаторы заявок */
    public static TicketAllIds = new TicketAllIdsStore();
    /** Идентификаторы открытых заявок */
    public static TicketOpenIds = new TicketOpenIdsStore();
    /** Идентификаторы закрытых заявок */
    public static TicketSuccessIds = new TicketSuccessIdsStore();
    /** Идентификаторы объявлений на текущий день */
    public static AdvTodayIds = new AdversmentToDayIdsStore();
    /** Идентификаторы объявлений на неделю от текущего дня */
    public static AdvToWeekIds = new AdversmentToWeekIdsStore();
}