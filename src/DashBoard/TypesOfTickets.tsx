import React from 'react';
import styles from '../Styles.module.scss';
import TicketGroup from './TicketGroup';
import { IDynamicFieldTS, OTRSSession, OTRSTicketSearch } from '@CHSUVladimir/otrs-connector';

export interface ITypeOfTickets{
    /** Пользователь с кем работает система*/
    UserName:string;
    /**Обычные заявки */
    StandartTIDs:string[];
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


interface loading{
    load:boolean;
    count:number;
}

interface loadingAdv extends loading{
    weekCount:number;
}

interface IState{
    ALL:loading;
    Open:loading;
    Success:loading;
    Adversment:loadingAdv;
  }

export default class TypesOfTickets extends React.Component<ITypeOfTickets, IState>{

    public state: Readonly<IState>={
        ALL:{
            load:true,
            count:0,
        },
        Open:{
            load:true,
            count:0, 
        },
        Success:{
            load:true,
            count:0, 
        },
        Adversment:{
            load:true,
            count:0,
            weekCount:0,
        },
    };

    public render(): React.ReactNode {        
        return (
            <div className={styles.typeOfTickets}>
                <TicketGroup 
                    TypeGroup='All' 
                    DisplayName='Всего' 
                    Await={this.state.ALL.load} 
                    Count={this.state.ALL.count} 
                    key={'All'}
                />
                <TicketGroup 
                    TypeGroup='Open' 
                    DisplayName='В обработке' 
                    Await={this.state.Open.load} 
                    Count={this.state.Open.count} 
                    key={'Open'}
                />
                <TicketGroup 
                    TypeGroup='Success' 
                    DisplayName='Завершенные' 
                    Await={this.state.Success.load} 
                    Count={this.state.Success.count} 
                    key={'Success'}
                />
                <TicketGroup 
                    TypeGroup='Adv' 
                    DisplayName='Объявления' 
                    Await={this.state.Adversment.load} 
                    Count={this.state.Adversment.count} 
                    CurCount={this.state.Adversment.weekCount} 
                    Title='Сегодня/В течение недели'
                    key={'Adv'}
                />
            </div>
        );
    }

    componentDidMount(): void {
        this.Reload();
    }

    private async Reload():Promise<void>{        
        let lat =this.LoadAllTickets();
        let lot =this.LoadOpenTickets();
        let lst = this.LoadSuccessTickets();
        let lad = this.LoadAdversment();

        await lat;
        await lot;
        await lst;
        await lad;
      }

      private async LoadAllTickets():Promise<void>{
        try{
            const ts = new OTRSTicketSearch();
            const st =ts.SearchTerms;
            st.SessionID = OTRSSession.SessionId();
            st.CustomerUserLogin =[this.props.UserName];
            st.TypeIDs = this.props.StandartTIDs;
            st.Limit=10000;
            const res = await ts.Search();            
            const ar = res as number[];
            if(ar.length){
                this.setState({ALL: {
                        load:false,
                        count:ar.length,
                    }});
            }else{
                const tid =res as number;
               if(!isNaN(tid)){
                this.setState({ALL:{
                        load:false,
                        count:1
                    }});
               }else{
                this.setState({ALL:{
                        load:false,
                        count:0
                    }});
               }
            }
        }catch{
            this.setState({ALL:{
                    load:false,
                    count:NaN
                }});
        }
      }

      private async LoadOpenTickets():Promise<void>{
        try{
            const ts = new OTRSTicketSearch();
            const st =ts.SearchTerms;
            st.SessionID = OTRSSession.SessionId();
            st.CustomerUserLogin =[this.props.UserName];
            st.TypeIDs = this.props.StandartTIDs;
            st.Limit=10000;
            st.StateIDs =this.props.OpenTicketStates;
            const res = await ts.Search();            
            const ar = res as number[];
            if(ar.length){
                this.setState({Open:{
                    load:false,
                    count:ar.length
                }});
            }else{
                const tid =res as number;
                if(!isNaN(tid)){
                    this.setState({Open:{
                        load:false,
                        count:1
                    }});
                }else{
                    this.setState({Open:{
                        load:false,
                        count:0
                    }});
                }
            }

        }catch{
            this.setState({Open:{
                load:false,
                count:NaN
            }});
        }
      }

      private async LoadSuccessTickets():Promise<void>{
        try{
            const ts = new OTRSTicketSearch();
            const st =ts.SearchTerms;
            st.SessionID = OTRSSession.SessionId();
            st.CustomerUserLogin =[this.props.UserName];
            st.TypeIDs = this.props.StandartTIDs;
            st.Limit=10000;
            st.StateIDs =this.props.CloseTicketStates;
            const res = await ts.Search();            
            const ar = res as number[];
            if(ar.length){
                this.setState({Success:{
                    load:false,
                    count:ar.length
                }});
            }else{
                const tid =res as number;
                if(!isNaN(tid)){
                    this.setState({Success:{
                        load:false,
                        count:1
                    }});
                }else{
                    this.setState({Success:{
                        load:false,
                        count:0
                    }});
                }
            }

        }catch{
            this.setState({Success:{
                load:false,
                count:NaN
            }});
        }
      }

      public async ReloadInternal():Promise<void>{
        await this.Reload();
      }

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

      private DynamicFieldsTD():IDynamicFieldTS[]{
        const res:IDynamicFieldTS[] =[];
        const sdf:IDynamicFieldTS={ Name:this.props.AdvFields.Start};
        const dt = new Date();
        const edt=new Date();
        edt.setHours(24); 
        edt.setMinutes(0);
        sdf.SmallerThanEquals=this.DateStr(edt);
        res.push(sdf);
        const edf:IDynamicFieldTS={ Name:this.props.AdvFields.End};      
        edf.GreaterThanEquals=this.DateStr(dt);
        res.push(edf);
        return res;
      }

      private DynamicFieldsW():IDynamicFieldTS[]{
        const res:IDynamicFieldTS[] =[];
        const sdf:IDynamicFieldTS={ Name:this.props.AdvFields.Start};
        const dt = new Date();
        const edt=new Date();
        edt.setHours(24); 
        edt.setMinutes(0);
        edt.setDate(edt.getDate()+6);
        sdf.SmallerThanEquals=this.DateStr(edt);
        res.push(sdf);
        const edf:IDynamicFieldTS={ Name:this.props.AdvFields.End};      
        edf.GreaterThanEquals=this.DateStr(dt);
        res.push(edf);
        return res;
      }

      private async LoadToDay():Promise<number|number[]>{
        const ts = new OTRSTicketSearch();
        const st =ts.SearchTerms;
        st.SessionID = OTRSSession.SessionId();
        st.CustomerUserLogin =[this.props.UserName];
        st.TypeIDs =this.props.AdversmentTIDs;
        st.Limit=10000;
        st.DynamicField=this.DynamicFieldsTD();
        return await ts.Search();
      }

      private async LoadToWeek():Promise<number|number[]>{
        const ts = new OTRSTicketSearch();
        const st =ts.SearchTerms;
        st.SessionID = OTRSSession.SessionId();
        st.CustomerUserLogin =[this.props.UserName];
        st.TypeIDs =this.props.AdversmentTIDs;
        st.Limit=10000;
        st.DynamicField=this.DynamicFieldsW();
        return await ts.Search();
      }

      private async LoadAdversment():Promise<void>{
        let td =0, tw=0;
        try{
            const res = await this.LoadToWeek();
            if(res){
                const ar = res as number[];
                if(ar.length){
                    tw=ar.length;
                }else{
                    const tid =res as number;
                    if(!isNaN(tid)){
                        tw=1;
                    }else{
                        tw=0;
                    }
                }
            }else{
                tw=0;
            }
            
        }catch{
            tw=NaN;
        }
        try{
            const res = await this.LoadToDay();
            if(res){
                const ar = res as number[];
                if(ar.length){
                    td=ar.length;
                }else{
                    const tid =res as number;
                    if(!isNaN(tid)){
                        td=1;
                    }else{
                        td=0;
                    }
                }
            }else{
                td=0;
            }
            
        }catch{
            td=NaN;
        }
        this.setState({Adversment:{
            load:false,
            count:tw,
            weekCount:td,
        }});
      }
}