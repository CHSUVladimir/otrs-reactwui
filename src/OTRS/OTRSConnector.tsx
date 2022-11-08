import { ISession, OTRSSession, OTRSTicketCreate, OTRSTicketGet, OTRSTicketSearch, OTRSTicketUpdate } from "@CHSUVladimir/otrs-connector";


export interface IOTRSSettings{
    /**Обычные заявки */
    NTIDs:string[];
    /**Объявления*/
    AdversmentTIDs:string[];
    /** Статусы заявок которые не закрыты*/
    OpenTicketStates:string[];
    /** Статусы заявок которые закрыты*/
    CloseTicketStates:string[];
    /** поля для работы с объявлениями*/
    AdvFields:{
      /**Название поля начала действия объявления */
      Start:string;
      /**Название поля для окончания действия объявления*/
      End:string;
    }
  }

  export interface URLs{
    /** Адрес получения ссесии */
    OTRSSession:string;
    /** Адрес поиска заявок */
    OTRSTicketSearch:string;
    /** Адрес создания заявок */
    OTRSTicketCreate:string;
    /** Адрес получения заявок */
    OTRSTicketGet:string;
    /** Адрес обновления заявок */
    OTRSTicketUpdate:string;
  }

  /**
   * @class ответсвенный за подключение к OTRS
   */
export default class OTRSConnector{
    /**
     * Методы подписки ответсвенные за загрузку отображения после того как произошло подключение к OTRS
     */
    private static afterConnection:(()=>any)[]=[];
    /**
     * Набор настроек (логин пароль) для подключения к OTRS
     */
    private static session:ISession;
    /**
     * набор адресов для работы с OTRS
     */
    private static urls:URLs;
    /**
     * Набор настроек для работы с OTRS (типы заявок и пр.)
     */
    private static settings:IOTRSSettings={} as IOTRSSettings;

    /**
     * @property {()=>any} подписывает метод на исполнения после того как было произведено подключение (получен идентификатор ссесиии)
     * @writeonly
     */
    public static set AfterConnection(handler:()=>any){
        this.afterConnection.push(handler);
    }

    /**
     * производит отписывание обработчика 
     * @param {()=>any} handler  метод на исполнения после того как было произведено подключение (получен идентификатор ссесиии)
     */
    public static RemoveAfterConnection(handler:()=>any){
        const ind = this.afterConnection.indexOf(handler);
        if(ind>-1){
            this.afterConnection.splice(ind,1);
        }
    }

    /**
     * Полностью обнуляет все подписки
     */
    public static ClearAfterConnection():void{
        this.afterConnection=[];
    }

    /**
     * @property {ISession} Набор настроек (логин пароль) для подключения к OTRS
     */
    public static set Session(v:ISession){
        this.session=v;
    }

    /**
     * @property {ISession} Набор настроек (логин пароль) для подключения к OTRS
     */
    public static get Session():ISession{
        return this.session;
    }

    /**
     * @property {string} устанавливает значение идентификатора ссесии и запускает исполнение события "после подключения"
     * @writeonly
     */
    public static set SesionId(v:string){
        OTRSSession.setSesionId(v);
        const urls = this.URLS;
        OTRSSession.URL=urls.OTRSSession;
        OTRSTicketSearch.URL=urls.OTRSTicketSearch;
        OTRSTicketCreate.URL =urls.OTRSTicketCreate;
        OTRSTicketGet.URL = urls.OTRSTicketGet;
        OTRSTicketUpdate.URL = urls.OTRSTicketUpdate;
        this.afterConnection.forEach(h=>h());
    }

    /**
     * Метод отвечающий за подключение к серверу OTRS
     */
    public static Connect():void{
        const urls = this.URLS;
        OTRSSession.URL=urls.OTRSSession;
        OTRSTicketSearch.URL=urls.OTRSTicketSearch;
        OTRSTicketCreate.URL =urls.OTRSTicketCreate;
        OTRSTicketGet.URL = urls.OTRSTicketGet;
        OTRSTicketUpdate.URL = urls.OTRSTicketUpdate;
        new OTRSSession(this.session,()=>{
            if(OTRSSession.SessionId()){
                this.afterConnection.forEach(h=>{h()});
              }else{
                alert('Не удалось подключиться к OTRS');
              }
        });
    }

    /**
     * @property {URLs} набор адресов для работы с OTRS
     */
    public static set URLS(u:URLs){
        this.urls=u;
    }

    /**
     * @property {URLs} набор адресов для работы с OTRS
     */
    public static get URLS():URLs{
        return this.urls;
    }

    /**
     * @property {IOTRSSettings} Набор настроек для работы с OTRS (типы заявок и пр.)
     */
    public static set Settings(s:IOTRSSettings){
        this.settings=s;
    }

    /**
     * @property {IOTRSSettings} Набор настроек для работы с OTRS (типы заявок и пр.)
     */
    public static get Settings():IOTRSSettings{
        return this.settings;
    }

    /**
     * @property {string[]} идентификаторы типов стандартных заявок
     */
    public static set StandartBids(NTIDs:string[]){
        this.settings.NTIDs=NTIDs;
    }

    /**
     * @property {string[]} идентификаторы типов стандартных заявок
     */
    public static get StandartBids():string[]{
        return this.settings.NTIDs
    }

    /**
     * @property {string[]} идентификаторы типов объявлений
     */
    public static set AdversmentTypes(AdvTIDs:string[]){
        this.settings.AdversmentTIDs=AdvTIDs;
    }

    /**
     * @property {string[]} идентификаторы типов объявлений
     */
    public static get AdversmentTypes():string[]{
        return this.settings.AdversmentTIDs;
    } 

}