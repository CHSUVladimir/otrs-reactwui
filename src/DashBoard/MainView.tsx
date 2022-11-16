import React from 'react';
import { OTRSType } from '../App';
import styles from '../Styles.module.scss';
import Top5LastEdited from './TicketsTabels/Top5LastEdited';
import TypesOfTickets from './TypesOfTickets';

export interface IMainView{
    View:OTRSType;
}

export default class MainView extends React.Component<IMainView>{

    public render(): React.ReactNode {
        switch(this.props.View){

            default:
                return (
                    <div className={styles.workPallete}>
                        <TypesOfTickets/>
                        <Top5LastEdited/>
                    </div>
                );
        }
    }
}