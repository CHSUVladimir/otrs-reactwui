import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; 
import styles from './Styles.module.scss'
import Menu, { IColorIcon } from './DashBoard/Menu/Menu';
import AwaitSpinner from './Elements/AwaitSpinner';
import MainView from './DashBoard/MainView';
import { CssColor } from './svg';





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
  /** Настройки диалогов */
  Dialogs:IDialogs;
  /** Настойки меню */
  MenuSettings:IMenuSettings;
}

export type OTRSType='Default'|'All'|'Open'|'Success'|'KnowledgeBase'|'Adversment';

interface IState{ 
  View:OTRSType;
}

export default class App extends React.Component<IOTRS, IState>{

  public state: Readonly<IState>={
    View:'Default',
  };

  public render(): React.ReactNode {
    if(!this.props.ExternalAwait){
      return (
        <div className={styles.mainPallete} key={'mainPallete'}>
          <Menu
            mRoot={this.props.Dialogs.MenuRoot}
            ColorIcons={this.props.MenuSettings.ColorIcons}
            MenuColor ={this.props.MenuSettings.MenuColor}
          />
          <MainView View={this.state.View} />                    
        </div>
      );
    }else{      
      return (
        <div className={styles.mainPallete} key={'mainPallete'}>
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
