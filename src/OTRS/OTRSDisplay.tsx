import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { IDialogs, IMenuSettings } from '../App';


export default class OTRSDisplay{
    /**
     * Корень для отображения диалоговых окон меню
     */
    private static dialogRoot:ReactDOM.Root;
    /**
     * Главный корень для приложения
     */
    private static mainRoot:ReactDOM.Root;
    private menuSettings:IMenuSettings={};


    /**
     * инициация для отображения всего проекта
     * @param {string|HTMLElement} mRoot идентификатор или элемент на котором будет отрендерен главный корень 
     */
    constructor(mRoot:string|HTMLElement){
        this.setMainRoot(mRoot);
        this.setDialogRoot();
    }

    /**
     * Устанавливает корень всего приложения
     * @param {string|HTMLElement} mRoot идентификатор или элемент на котором будет отрендерен главный корень
     */
    private setMainRoot(mRoot:string|HTMLElement):void{
        if(!OTRSDisplay.mainRoot){
            const hm = mRoot as HTMLElement;
            if(hm.tagName){
                OTRSDisplay.mainRoot=ReactDOM.createRoot(hm);
            }else{
                const ide = mRoot as string;
                const el = document.getElementById(ide) as HTMLElement;
                OTRSDisplay.mainRoot=ReactDOM.createRoot(el);
            }
        }else{
            console.error("Невозможно перестроить проект, попробуйте перезапустить проект и заново построить!");
        }
    }

    /**
     * Метод устанавливает корни диалогов
     */
    private setDialogRoot():void{
        if(!OTRSDisplay.dialogRoot){
            const drel = document.createElement('div');
            document.body.appendChild(drel);
            OTRSDisplay.dialogRoot=ReactDOM.createRoot(drel);
        }
        
    }

     /**
     * @property {IMenuSettings} Настройки меню
     */
    public set MenuSettings(ms:IMenuSettings){
        this.menuSettings=ms;
    }

    /**
     * @property {IMenuSettings} Настройки меню
     */
    public get MenuSettings():IMenuSettings{
        return this.menuSettings;
    }

    /**
     * @property {IDialogs} Набор корней для отображения диалоговых окон
     */
    private get Dialogs():IDialogs{
        return {
            MenuRoot:OTRSDisplay.dialogRoot
        };
    }

    /**
     * Строит всеэлементы в инициализированном корне
     * @param {boolean?} forceAwait  принудительное отображение ожидания
     */
    public Render(forceAwait?:boolean){
        const fa=forceAwait??false;
        OTRSDisplay.mainRoot.render(
            <React.StrictMode>
                <App
                    ExternalAwait={fa}
                    Dialogs={this.Dialogs}
                    MenuSettings={this.menuSettings}
                />
            </React.StrictMode>
        );
    }
}