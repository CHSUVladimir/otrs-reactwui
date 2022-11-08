import React from "react";
import styles from '../../Styles.module.scss';
import { CssColor } from "./Menu";

export interface IBar{
    color?:CssColor;
}

export default class Bar extends React.Component<IBar>{

    public render(): React.ReactNode {
        return (
            <div className={styles.icon}>
                <svg style={{width:"100%"}} viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
	                <path d="M16 132H432C440.837 132 448 124.837 448 116V76C448 67.163 440.837 60 432 60H16C7.163 60 0 67.163 0 76V116C0 124.837 7.163 132 16 132Z
			                 M16 292H432C440.837 292 448 284.837 448 276V236C448 227.163 440.837 220 432 220H16C7.163 220 0 227.163 0 236V276C0 284.837 7.163 292 16 292Z
			                 M16 452H432C440.837 452 448 444.837 448 436V396C448 387.163 440.837 380 432 380H16C7.163 380 0 387.163 0 396V436C0 444.837 7.163 452 16 452Z" 
	                fill={this.props.color?this.props.color:"#fff"}/>
                </svg>
            </div>
        );
    }
}