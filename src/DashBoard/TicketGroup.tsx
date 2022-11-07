import React from 'react';
import AwaitSpinner from '../Elements/AwaitSpinner';
import styles from '../Styles.module.scss';

export type TicketGroupType='Success'|'Open'|'All'|'Adv';

export interface ITicketGroup{
    TypeGroup:TicketGroupType;
    DisplayName:string;
    Await:boolean;
    Count:number;
    CurCount?:number;
    Title?:string;
    Style?:React.CSSProperties;
    StyleAwait?:React.CSSProperties;
}

export default class TicketGroup extends React.Component<ITicketGroup>{
    public render(): React.ReactElement {
        if(!this.props.Await){            
            return (
                <div className={this.ClassesCss()}>
                    <h2>{this.props.DisplayName}</h2>
                    <div>{this.props.CurCount!==undefined?this.props.CurCount+"/":""}{this.props.Count}</div>
                </div>
            );
        }else{
            return (
                <div style={this.AwaitCss()}>
                    <AwaitSpinner/>
                </div>
            );
        }
    }

    private AwaitCss():React.CSSProperties{
        return this.props.StyleAwait??{display:'inline-block'};
    }

    private ClassesCss():string{
        let res =styles.typeBlock;
        switch(this.props.TypeGroup){
            case 'All': res+= ' ' + styles.infoBlock; break;
            case 'Open': res+= ' ' + styles.newBlock; break;
            case 'Success': res+= ' ' + styles.successBlock; break;
            case 'Adv': res+= ' ' + styles.advBlock; break;
            default: break;
        }
        return res;
    }
}