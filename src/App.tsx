//import {ISession, OTRSSession, OTRSTicketCreate, OTRSTicketGet, OTRSTicketSearch, OTRSTicketUpdate } from '@CHSUVladimir/otrs-connector';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; 
import Menu, { CssColor, IColorIcon } from './DashBoard/Menu/Menu';
import TypesOfTickets from './DashBoard/TypesOfTickets';
import AwaitSpinner from './Elements/AwaitSpinner';





export interface IDialogs{
  MenuRoot:ReactDOM.Root;
}

export interface IMenuSettings{
  /** Цвета иконок */
  ColorIcons?:IColorIcon;
  /** Цвет меню */
  MenuColor?:CssColor;
}


export interface IOTRS{
  /** Принудительное ожидание */
  ExternalAwait:boolean;
  /** Набор адресов для подключения */
  //URLS:URLs;
  /** Организация подключения к OTRS */
  //OTRSSession:ISession;
  /** Настройки  OTRS*/
  //OTRSSettings:IOTRSSettings;
  /** Настройки диалогов */
  Dialogs:IDialogs;
  /** Настойки меню */
  MenuSettings:IMenuSettings;
}

interface IState{ 

}

export default class App extends React.Component<IOTRS, IState>{

  public state: Readonly<IState>={};

  public render(): React.ReactNode {
    if(!this.props.ExternalAwait){
      return (
        <div>
          <TypesOfTickets/>   
          <Menu
            mRoot={this.props.Dialogs.MenuRoot}
            ColorIcons={this.props.MenuSettings.ColorIcons}
            MenuColor ={this.props.MenuSettings.MenuColor}
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

 
  
  componentDidMount(): void {
    
  }

  componentDidUpdate(prevProps: Readonly<IOTRS>, prevState: Readonly<IState>, snapshot?: any): void {
    
  }

}
