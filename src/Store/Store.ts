

export default class Store<T>{
    /** Данные содержимого */
    public Buffer:T[]=[];
    /** Произведена первичная загрузка */
    public FirstLoadStarted:boolean=false;
    /**
     * Первичная загрузка
     */
    public async FirstLoad():Promise<any>{
        const res = await this.Load();
        this.FirstLoadStarted=true;
        this.UpdateTimer= setInterval(()=>{this.Load();},this.UpdateInterval);
        return res;
    }
    
    /**
     * Принудительная перезагрузка
     */
    public async ForceReload():Promise<any>{
        if(this.UpdateTimer){
            clearInterval(this.UpdateTimer);
            return await this.FirstLoad();
        }else{
            return await this.FirstLoad();
        }
    }

    /**
     * Подписанные на обновление
     */
    private _subscribedUpdate:{[name:string]:()=>any}={};

    /**
     * Подписка на обновление
     * @param {string} name наименование подписки (должно быть уникальным)
     * @param {()=>any} method метод исполняемый при обновлении
     */
    public SubscribeToUpdate(name:string, method:()=>any){
        this._subscribedUpdate[name]=method;
    }

    /**
     * Отписка от обновления
     * @param {string} name наименование подписки (должно быть уникальным)
     */
    public UnSubscribeToUpdate(name:string){
        if(this._subscribedUpdate[name]){
            delete this._subscribedUpdate[name];
        }        
    }

    /**
     * Проверяет отсутствие названия подписки во всех подписках
     * @param {string} name Наименование подписки для проверки
     * @returns {boolean} Отсутствие подписки с таким именем
     */
    public NameIsUniqeSubUpd(name:string):boolean{
        if(this._subscribedUpdate[name]){
            return false;
        }else{
            return true;
        }
    }

    /**
     * Действие при обновлении
     */
     protected Updated():void{
        for(var h in this._subscribedUpdate){
            this._subscribedUpdate[h]();
        }
    }

    /**
     * время в милисекундах между обновлениями
     */
    public UpdateInterval:number=300000;
    
    /** 
     * Таймер обслуживающий обновления
    */
    private UpdateTimer?:NodeJS.Timer;

    protected async Load():Promise<any>{}

}