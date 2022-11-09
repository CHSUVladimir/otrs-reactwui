import { IDynamicFieldTS, OTRSSession, OTRSTicketSearch } from "@CHSUVladimir/otrs-connector";
import ShadowOTRSConnector from "../../OTRS/ShadowOTRSConnector";
import Store from "../Store";

export default class AdversmentIdsStore extends Store<number>{
    private  ticketSearch = new OTRSTicketSearch();
    private DateFieldsTerms:IDynamicFieldTS[]=[];

    /**
     * Преобразует дату в строку необходимую для поиска по датам в формате yyyy-MM-dd HH:mm:ss
     * @param {Date} D дата для преобразования
     * @returns {string} строку даты в формате yyyy-MM-dd HH:mm:ss
     */
     private DateStr(D:Date):string{
        var day=D.getDate()>10?D.getDate():"0"+D.getDate();
        var month=D.getMonth()+1<10?"0"+(D.getMonth()-1+2):(D.getMonth()-1+2);
        var hour=D.getHours()>9?D.getHours():"0"+D.getHours();
        var minutes=D.getMinutes()>9?D.getMinutes():"0"+D.getMinutes();
  
        return`${D.getFullYear()}-${month}-${day} ${hour}:${minutes}:00`;
      }

      /**
       * условия поиска по полям на заданный период
       * @param {Date} dt начало периода
       * @param {Date} edt окончание периода
       */
      private setDateFieldsTerms(dt:Date, edt:Date){
        this.DateFieldsTerms=[];
        let res = this.DateFieldsTerms;        
        const sdf:IDynamicFieldTS={ Name:ShadowOTRSConnector.Settings.AdvFields.Start};
        sdf.SmallerThanEquals=this.DateStr(edt);
        res.push(sdf);
        const edf:IDynamicFieldTS={ Name:ShadowOTRSConnector.Settings.AdvFields.End};      
        edf.GreaterThanEquals=this.DateStr(dt);
        res.push(edf);
      }

      /**
       * Устанавливает условия поиска по полям на текущий день
       */
      private setTodayDFTerms():void{
        const dt = new Date();
        dt.setHours(0); 
        dt.setMinutes(0);
        const edt=new Date();
        edt.setHours(24); 
        edt.setMinutes(0);
        this.setDateFieldsTerms(dt,edt);

      }

      /**
       * Устанавливает условия поиска по полям на текущую неделю
       */
      private setToWeekDFTerms():void{
        const dt = new Date();
        dt.setHours(0); 
        dt.setMinutes(0);
        const edt=new Date();
        edt.setHours(24); 
        edt.setMinutes(0);
        edt.setDate(edt.getDate()+6);
        this.setDateFieldsTerms(dt,edt);

      }

      /**
       * Устанавливает условия поиска
       */
      private setStandartTerms():void{
        const st =this.ticketSearch.SearchTerms;   
        st.SessionID = OTRSSession.SessionId();  
        st.CustomerUserLogin =[ShadowOTRSConnector.Session.CustomerUserLogin];
        st.TypeIDs = ShadowOTRSConnector.AdversmentTypes;
        st.Limit=10000;
        st.DynamicField=this.DateFieldsTerms;
      }

      /**
       * Загружает идентификаторы в соответсвии с условиями
       */
      private async LoadData():Promise<void>{
        const res = await this.ticketSearch.Search(); 
        const ar = res as number[];
        if(ar && ar.length){
            this.Buffer=ar;
            this.Updated();
        }else{
            const tid =res as number;
            if(!isNaN(tid)){
                this.Buffer=[tid];
                this.Updated();
            }else{
              this.Buffer=[];
                this.Updated();
            }
        }
      }

      /**
       * Загружает идентификаторы объявлений на ближайший день
       */
      protected async LoadToDay():Promise<void>{
        this.setTodayDFTerms();
        this.setStandartTerms();
        await this.LoadData();
      }

      /**
       * Загружает идентификаторы объявлений на ближайшую неделю
       */
      protected async LoadToWeek():Promise<void>{
        this.setToWeekDFTerms();
        this.setStandartTerms();
        await this.LoadData();
      }

      


    /**
     * Получает количество объявлений
     * @returns {number} количество объявлений
     */
    public Count():number{
        return this.Buffer.length;
    }
}