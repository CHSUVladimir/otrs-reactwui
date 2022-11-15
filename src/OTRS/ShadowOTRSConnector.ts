import { ISession } from "@CHSUVladimir/otrs-connector";
import { IQueue, IQueueForm, IQueueTree } from "../Queues";
import { IOTRSSettings} from "./OTRSConnector";

export default class ShadowOTRSConnector{
    /**
     * Подписанные на обновление
     */
    private static _subscribedAfterConnection:{[name:string]:()=>any}={};

    /**
     * Подписка на обновление
     * @param {string} name наименование подписки (должно быть уникальным)
     * @param {()=>any} method метод исполняемый при обновлении
    */
    public static SubscribeAfterConnection(name:string, method:()=>any){
        this._subscribedAfterConnection[name]=method;
    }

    /**
     * Отписка от обновления
     * @param {string} name наименование подписки (должно быть уникальным)
     */
     public static UnSubscribeAfterConnection(name:string){
        if(this._subscribedAfterConnection[name]){
            delete this._subscribedAfterConnection[name];
        }        
    }

    /**
     * Проверяет отсутствие названия подписки во всех подписках
     * @param {string} name Наименование подписки для проверки
     * @returns {boolean} Отсутствие подписки с таким именем
     */
    public static NameIsUniqeSubUpd(name:string):boolean{
        if(this._subscribedAfterConnection[name]){
            return false;
        }else{
            return true;
        }
    }

    /**
     * Действие при обновлении
    */
    public static Updated():void{
        for(var h in this._subscribedAfterConnection){
            this._subscribedAfterConnection[h]();
        }
    }

    /**
     * Набор настроек (логин пароль) для подключения к OTRS
     */
    private static session:ISession;
    /**
      * Набор настроек для работы с OTRS (типы заявок и пр.)
      */
    private static settings:IOTRSSettings={} as IOTRSSettings;

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

    /**
     * Хранилище очередей
     */
    private static queues:IQueue[]=[];

    /**
     * при установке значения производит перестроение дерева очередей
     * @property {IQueue[]}  Значения очередей (установка получение)
     */
    public static set Queues(v:IQueue[]){
        this.queues = v;
        this.rebuildTree();
    }

    /**
     * @returns {IQueue[]} набор очередей заданные при конфигурации
     */
    public static get Queues():IQueue[]{
        return this.queues;
    }

    /**
     * Хранлище дерева очередей
     */
    private static queueTree:IQueueTree[]=[];

    /**
     * @returns {IQueueTree[]} набор очередей, являющихся корнем со всеми ветвлениями
     */
    public static get QueueTree():IQueueTree[]{
        return this.queueTree;
    }

    /**
     * Хранилище форм заполнения
     */
    private static forms:IQueueForm[]=[];

    /**
     * при установке значения производит перестроение дерева очередей
     * @property {IQueueForm[]} Набор форм заполнения
     */
    public static set Forms(v:IQueueForm[]){
        this.forms=v;
        this.rebuildTree();
    }

    /**
     * @returns {IQueueForm[]} набор форм заполенния установленных в системе
     */
    public static get Forms():IQueueForm[]{
        return this.forms;
    }

    /**
     * производит формирование дочерних узлов для заданого корня
     * @param {IQueueTree} root Корень для которого необходимо установить все дочерние контролы
     */
    private static rebuildBranch(root:IQueueTree):void{
        this.queues.filter(m=>m.ParentId === root.QueueId).forEach(m=>{
            const ch:IQueueTree={
                QueueId:m.Id,
                Childrens:[],
                Forms:this.forms.filter(f=>f.QueueId===m.Id),
            };
            root.Childrens.push(ch);
        });
        root.Childrens.forEach(b=>{
            this.rebuildBranch(b);
        });
    }

    /**
     * Принудительное перестроение дерева очередей
     */
    private static rebuildTree():void{
        const roots:IQueueTree[]=[];
        this.queues.filter(m=>!m.ParentId).forEach(m=>{
            const root:IQueueTree={
                QueueId:m.Id,
                Childrens:[],
                Forms:this.forms.filter(f=>f.QueueId===m.Id),
            };
            roots.push(root);
        });
        roots.forEach(r=>{
            this.rebuildBranch(r);
        });
        this.queueTree=roots;
    }

    private static _otersStatusEncoder:{[key:number]:string}={};

    public static set StatusEncoder(v:{[key:number]:string}){
        this._otersStatusEncoder=v;
    }

    public static get StatusEncoder():{[key:number]:string}{
        return this._otersStatusEncoder;
    }

}