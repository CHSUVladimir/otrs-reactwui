import { ISession, OTRSSession, OTRSTicketCreate, OTRSTicketGet, OTRSTicketSearch, OTRSTicketUpdate } from "@CHSUVladimir/otrs-connector";
import { IQueue, IQueueForm } from "../Queues";
import ShadowOTRSConnector from "./ShadowOTRSConnector";


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
     * @property {()=>any} подписывает метод на исполнения после того как было произведено подключение (получен идентификатор ссесиии)
     * @writeonly
     */
    public static set AfterConnection(v:{name:string, handler:()=>any}){
        ShadowOTRSConnector.SubscribeAfterConnection(v.name,v.handler);
    }

    /**
     * производит отписывание обработчика 
     * @param {()=>any} handler  метод на исполнения после того как было произведено подключение (получен идентификатор ссесиии)
     */
    public static RemoveAfterConnection(name:string){
        ShadowOTRSConnector.UnSubscribeAfterConnection(name);
    }   

    /**
     * @property {ISession} Набор настроек (логин пароль) для подключения к OTRS
     */
    public static set Session(v:ISession){
        ShadowOTRSConnector.Session=v;
    }

    

    /**
     * @property {string} устанавливает значение идентификатора ссесии и запускает исполнение события "после подключения"
     * @writeonly
     */
    public static set SesionId(v:string){
        OTRSSession.setSesionId(v);        
        ShadowOTRSConnector.Updated();
    }

    /**
     * Метод отвечающий за подключение к серверу OTRS
     */
    public static Connect():void{
        new OTRSSession(ShadowOTRSConnector.Session,()=>{
            if(OTRSSession.SessionId()){
                ShadowOTRSConnector.Updated();
              }else{
                alert('Не удалось подключиться к OTRS');
              }
        });
    }

    /**
     * @property {URLs} набор адресов для работы с OTRS
     */
    public static set URLS(u:URLs){
        const urls =u;
        OTRSSession.URL=urls.OTRSSession;
        OTRSTicketSearch.URL=urls.OTRSTicketSearch;
        OTRSTicketCreate.URL =urls.OTRSTicketCreate;
        OTRSTicketGet.URL = urls.OTRSTicketGet;
        OTRSTicketUpdate.URL = urls.OTRSTicketUpdate;
        
    }

    

    /**
     * @property {IOTRSSettings} Набор настроек для работы с OTRS (типы заявок и пр.)
     */
    public static set Settings(s:IOTRSSettings){
        ShadowOTRSConnector.Settings=s;
    }

    /**
     * Загружает данные расположенные по адресу (может в том числе получать данные от апи или из файла)
     * @param url Адрес где расположены данные об очередях
     */
    public static LoadQueuesFromURL(url:string){
        fetch(url)
            .then(function(response) {
                response.json().then(function(text) {
                    ShadowOTRSConnector.Queues=text;
                });
            });
    }

    /**
     * Загружает данные расположенные по адресу (может в том числе получать данные от апи или из файла)
     * @param url Адрес где расположены данные о формах заполнения
     */
    public static LoadFormsFromURL(url:string){
        fetch(url)
            .then(function(response) {
                response.json().then(function(text) {
                    ShadowOTRSConnector.Forms=text;
                });
            });
    }

    /**
     * Устанавливает значение очередей
     */
    public static set Queues(v:IQueue[]){
        ShadowOTRSConnector.Queues=v;
    }

    /**
     * Устанвливает данные форм заполнения
     */
    public static set Forms(v:IQueueForm[]){
        ShadowOTRSConnector.Forms=v;
    }

    /**
     * Устанавливыает значения статусов
     */
    public static set StatusEncoder(v:{[key:number]:string}){
        ShadowOTRSConnector.StatusEncoder=v;
    }
    

}