import React from 'react';
import styles from '../Styles.module.scss';
import TicketGroup from './TicketGroup';
import StoryManager from '../Store/0AStoryManager';

export interface ITypeOfTickets{
    
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

    private subscribeName="TypeOfTickets";

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
        this.Reload().then();
    }

    componentDidUpdate(prevProps: Readonly<ITypeOfTickets>, prevState: Readonly<IState>, snapshot?: any): void {
        //this.Reload();
    }

    componentWillUnmount(): void {
        this.UnSubscribe();
    }

    private UnSubscribe():void{
        const ta = StoryManager.TicketsIds.TicketAllIds;
        if(!ta.NameIsUniqeSubUpd(this.subscribeName)){
            ta.UnSubscribeToUpdate(this.subscribeName);
        }
        const to = StoryManager.TicketsIds.TicketOpenIds;
        if(!to.NameIsUniqeSubUpd(this.subscribeName)){
            to.UnSubscribeToUpdate(this.subscribeName);
        }

        const ts = StoryManager.TicketsIds.TicketSuccessIds;
        if(!ts.NameIsUniqeSubUpd(this.subscribeName)){
            ts.UnSubscribeToUpdate(this.subscribeName);
        }
        const atd = StoryManager.Adversment.AdvTodayIds;
        if(!atd.NameIsUniqeSubUpd(this.subscribeName)){
            atd.UnSubscribeToUpdate(this.subscribeName);
        }
        const atw = StoryManager.Adversment.AdvToWeekIds;
        if(!atw.NameIsUniqeSubUpd(this.subscribeName)){
            atw.UnSubscribeToUpdate(this.subscribeName);
        }
    }

    /**
     * производит перезагрузку данных
     */
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

      /**
       * @async метод получения всех заявок поданных пользователем
       */
      private async LoadAllTickets():Promise<void>{
        try{
            const t = StoryManager.TicketsIds.TicketAllIds;
            if(t.FirstLoadStarted){
                this.setState({ALL:{
                    load:false,
                    count:t.Count()
                }});
            }else{
                await t.FirstLoad();                
                this.setState({ALL:{
                    load:false,
                    count:t.Count()
                }});
            }    
            if(t.NameIsUniqeSubUpd(this.subscribeName)){
                t.SubscribeToUpdate(this.subscribeName,()=>{
                    const tt =StoryManager.TicketsIds.TicketAllIds;
                    this.setState({ALL:{
                        load:false,
                        count:tt.Count()
                    }});
                })                    
            }      
        }catch(error){
            console.error(error);
            this.setState({ALL:{
                    load:false,
                    count:NaN
                }});
        }
      }

      /**
       * @async метод получения всех заявок находящихся в обработке
       */
      private async LoadOpenTickets():Promise<void>{
        try{
            const t = StoryManager.TicketsIds.TicketOpenIds;
            if(t.FirstLoadStarted){
                this.setState({Open:{
                    load:false,
                    count:t.Count()
                }});
            }else{
                await t.FirstLoad();
                this.setState({Open:{
                    load:false,
                    count:t.Count()
                }});               
            }
            if(t.NameIsUniqeSubUpd(this.subscribeName)){
                t.SubscribeToUpdate(this.subscribeName,()=>{
                    const tt =StoryManager.TicketsIds.TicketOpenIds;
                    this.setState({Open:{
                        load:false,
                        count:tt.Count()
                    }});
                })                    
            }
        }catch{
            this.setState({Open:{
                load:false,
                count:NaN
            }});
        }
      }

      /**
       * @async метод получения всех заявок, которые были выполены для пользователя
       */
      private async LoadSuccessTickets():Promise<void>{
        try{
            const t = StoryManager.TicketsIds.TicketSuccessIds;
            if(t.FirstLoadStarted){
                this.setState({Success:{
                    load:false,
                    count:t.Count()
                }});
            }else{
                await t.FirstLoad();
                this.setState({Success:{
                    load:false,
                    count:t.Count()
                }}); 
            }
            if(t.NameIsUniqeSubUpd(this.subscribeName)){
                t.SubscribeToUpdate(this.subscribeName,()=>{
                    const tt =StoryManager.TicketsIds.TicketSuccessIds;
                    this.setState({Success:{
                        load:false,
                        count:tt.Count()
                    }});
                })                    
            }           
        }catch{
            this.setState({Success:{
                load:false,
                count:NaN
            }});
        }
      }

      /**
       * Принудительная перезагрузка данных 
       */
      public async ReloadInternal():Promise<void>{
        await this.Reload();
      }

     
      /**
       * Загрузка объявлений действующих на текущий день
       * @returns {Promise<number|number[]>} идентификаторы заявок
       */
      private async LoadToDay():Promise<number>{
        const t = StoryManager.Adversment.AdvTodayIds;
        let res=-1;
        if(t.FirstLoadStarted){
            res= t.Count();
        }else{
            await t.FirstLoad();
            res= t.Count();
        }
        if(t.NameIsUniqeSubUpd(this.subscribeName)){
            t.SubscribeToUpdate(this.subscribeName,()=>{
               this.LoadAdversment();
            })                    
        } 
        return res; 
      }

      /**
       * Загрузка набора объявлений на текущую неделю
       * @returns {Promise<number|number[]>} идентификаторы заявок
       */
      private async LoadToWeek():Promise<number>{
        const t = StoryManager.Adversment.AdvToWeekIds;
        let res=NaN;
        if(t.FirstLoadStarted){
            res= t.Count();
        }else{
            await t.FirstLoad();
            res= t.Count();
        }
        if(t.NameIsUniqeSubUpd(this.subscribeName)){
            t.SubscribeToUpdate(this.subscribeName,()=>{
               this.LoadAdversment();
            })                    
        } 
        return res; 
      }

      /** 
       * Производится загрузка всех объявлений на ближайшую неделю и на сегодня 
       * */
      private async LoadAdversment():Promise<void>{
        let td =0, tw=0;
        try{
            tw = await this.LoadToWeek();
        }catch{
            tw=NaN;
        }
        try{
            td = await this.LoadToDay();                      
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