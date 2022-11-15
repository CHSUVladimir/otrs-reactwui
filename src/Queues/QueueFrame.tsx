import React from "react";
import styles from "../Styles.module.scss";
import Close from "../svg/Close";
import WorkPanel from "./WorkPanel/WorkPanel";

export interface IQueueFrame{
    onClose:()=>void;
    display:boolean; 
}

export default class QueueFrame extends React.Component<IQueueFrame>{

    public render(): React.ReactNode {
        if(this.props.display){
            return(
            <div className={styles.maindialogBackground}>
                <div className={styles.dialog}> 
                    <span className={styles.closeIcon} onClick={()=>this.props.onClose()}>
                        <Close/>
                    </span>
                    <div className={styles.searchLine}>
                        <h1>Быстрый поиск заявок</h1>
                        <input type='search' placeholder="Укажите вашу проблему, и мы попробуем подобрать подходящую заявку"/> 
                        <div className={styles.button}>Искать</div>
                    </div>                    
                    <div className={styles.mainPallete}>
                        <WorkPanel/>
                        <div className={styles.oftenUsedPanel}>
                            <h3>
                                Часто используемые заявки
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            );
        }else{
            return <></>;
        }
    }
}