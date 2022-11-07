import {ISession, OTRSSession, OTRSTicketCreate, OTRSTicketGet, OTRSTicketSearch, OTRSTicketUpdate } from '@CHSUVladimir/otrs-connector';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; 
import { IColorIcon } from './DashBoard/Menu/Menu';
import TypesOfTickets from './DashBoard/TypesOfTickets';
import AwaitSpinner from './Elements/AwaitSpinner';

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

export interface IDialogs{
  MenuRoot:ReactDOM.Root;
}

export interface IMenuSettings{
  /** Цвета иконок */
  ColorIcons?:IColorIcon;
}


export interface IOTRS{
  /** Принудительное ожидание */
  ExternalAwait:boolean;
  /** Набор адресов для подключения */
  URLS:URLs;
  /** Организация подключения к OTRS */
  OTRSSession:ISession;
  /** Настройки  OTRS*/
  OTRSSettings:IOTRSSettings;
  /** Настройки диалогов */
  Dialogs:IDialogs;
  /** Настойки меню */
  MenuSettings:IMenuSettings;
}

interface IState{
  settingsLoaded:boolean;

}

export default class App extends React.Component<IOTRS, IState>{

  public state: Readonly<IState>={
    settingsLoaded:false,
  };

  public render(): React.ReactNode {
    if(!this.props.ExternalAwait && this.state.settingsLoaded){
      return (
        <div>
          <TypesOfTickets 
            UserName={this.props.OTRSSession.CustomerUserLogin} 
            StandartTIDs={this.props.OTRSSettings.NTIDs}
            AdversmentTIDs={this.props.OTRSSettings.AdversmentTIDs}
            OpenTicketStates={this.props.OTRSSettings.OpenTicketStates}
            CloseTicketStates={this.props.OTRSSettings.CloseTicketStates}
            AdvFields={this.props.OTRSSettings.AdvFields}
          />   

        </div>
      );
    }else{      
      return (
        <div>
          <AwaitSpinner/>
        </div>
      );
    }
    
  }

  private async SetSettings():Promise<void>{
    const urls = this.props.URLS;
    OTRSSession.URL=urls.OTRSSession;
    OTRSTicketSearch.URL=urls.OTRSTicketSearch;
    OTRSTicketCreate.URL =urls.OTRSTicketCreate;
    OTRSTicketGet.URL = urls.OTRSTicketGet;
    OTRSTicketUpdate.URL = urls.OTRSTicketUpdate;
    new OTRSSession(this.props.OTRSSession,()=>{
      this.setState({settingsLoaded:true});
      if(!OTRSSession.SessionId()){
        alert('Не удалось подключиться к OTRS');
      }
    });
    
  }
  
  componentDidMount(): void {
    this.SetSettings();
  }

  componentDidUpdate(prevProps: Readonly<IOTRS>, prevState: Readonly<IState>, snapshot?: any): void {
    if(this.props.ExternalAwait || !this.state.settingsLoaded){
      this.SetSettings();
    }
  }

}
