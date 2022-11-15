import React from "react";
import styles from '../../Styles.module.scss';
import { CssColor } from "../../svg";
import BarSVG from "../../svg/BarSVG";


export interface IBar{
    color?:CssColor;
}

export default class Bar extends React.Component<IBar>{

    public render(): React.ReactNode {
        return (
            <div className={styles.icon}>
                <BarSVG color={this.props.color} />
            </div>
        );
    }
}