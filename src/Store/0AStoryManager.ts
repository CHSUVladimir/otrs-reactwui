import AdversmentToDayIdsStore from "./AdversmentToDayIdsStore";
import AdversmentToWeekIdsStore from "./AdversmentToWeekIdsStore";
import TicketAllIdsStore from "./TicketAllIdsStore";
import TicketOpenIdsStore from "./TicketOpenIdsStore";
import TicketSuccessIdsStore from "./TicketSuccessIdsStore";

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