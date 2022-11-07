import React from 'react';
import styles from '../Styles.module.scss';

export default class AwaitSpinner extends React.Component<{style?:React.CSSProperties}>{

    public  render(): React.ReactElement{
        return (
            <div className={styles.rotatePanel}>
                <div className={styles.Rotate}>
                    <div></div>                
                </div>
                <span>Подождите, мы работаем над этим!</span>
            </div>
            
        );
    }    
}