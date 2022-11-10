import TicketAllIdsStore from "./TicketAllIdsStore";
import TicketOpenIdsStore from "./TicketOpenIdsStore";
import TicketIdsStore from "./TicketsIdsStore";
import TicketsIdsTop5Store from "./TicketsIdsTop5Store";
import TicketSuccessIdsStore from "./TicketSuccessIdsStore";


export default class TicketIdsManager{
     /** Все идентификаторы заявок */
     public static TicketAllIds = new TicketAllIdsStore();
     /** Идентификаторы открытых заявок */
     public static TicketOpenIds = new TicketOpenIdsStore();
     /** Идентификаторы закрытых заявок */
     public static TicketSuccessIds = new TicketSuccessIdsStore();
     /**
      * Top 5 заявок сортированных по дате изменения
      */
     public static TicketTop5Ids = new TicketsIdsTop5Store();
     /**
      * Набор взаимосвязанных элементов заявок для принудительной перезагрузки
      */
     public static TicketsInternal:TicketIdsStore[]=[this.TicketAllIds, this.TicketOpenIds, this.TicketSuccessIds, this.TicketTop5Ids];
}