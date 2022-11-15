import React from 'react';
import ReactDOM from 'react-dom/client';
import { OTRSType } from '../App';
import styles from '../Styles.module.scss';
import Top5LastEdited from './TicketsTabels/Top5LastEdited';
import TypesOfTickets from './TypesOfTickets';

export interface IMainView{
    View:OTRSType;
    mRoot:ReactDOM.Root;
}

export default class MainView extends React.Component<IMainView>{

    public render(): React.ReactNode {
        switch(this.props.View){

            default:
                return (
                    <div className={styles.workPallete}>
                        <TypesOfTickets/>
                        <Top5LastEdited mRoot={this.props.mRoot}/>
                    </div>
                );
        }
    }
}