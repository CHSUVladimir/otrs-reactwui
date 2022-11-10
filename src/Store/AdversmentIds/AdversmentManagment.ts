import AdversmentToDayIdsStore from "./AdversmentToDayIdsStore";
import AdversmentToWeekIdsStore from "./AdversmentToWeekIdsStore";


export default class AdversmentManagment{
     /** Идентификаторы объявлений на текущий день */
     public static AdvTodayIds = new AdversmentToDayIdsStore();
     /** Идентификаторы объявлений на неделю от текущего дня */
     public static AdvToWeekIds = new AdversmentToWeekIdsStore();
     /**
      * Набор взаимосвязанных элементов объявлений для принудительной перезагрузки
      */
     public static AdvInternal=[this.AdvTodayIds, this.AdvToWeekIds];
}