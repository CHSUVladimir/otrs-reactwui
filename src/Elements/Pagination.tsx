import React from "react";
import { Dictionary, IKeyValuePair } from ".";

export interface IPagination<T>{
    /**
     * Набор элементов которые будут перечисляться
     */
    Elements?:T[];
    /**
     * Максимальное количество элементов перечисления одновременно отображаемых
     */
    MaxPages:number;
    /**
     * Действие при нажатии на страничку выполняемое внешним элементом
     */
    onSelect:(v:T)=>void;
    /**
     * CSS класс для всего элемента
     */
    className?:string;
    /**
     * Стиль всего элемента
     */
    style?:React.CSSProperties;
    /**
     * Класс для элемента перечисления
     */
    pageClass?:string;
    /**
     * Стиль элемента перечисления
     */
    pageStyle?:React.CSSProperties;
    /**
     * CSS Стиль текущей выбранной страницы
     */
    pageOnSelectedStyle?:React.CSSProperties;
    /**
     * CSS Класс текущей выбранной страницы
     */
    pageOnSelectedClass?:string;
}

export default class Pagination<T> extends React.Component<IPagination<T>,{curentN:number}>{
    public state: Readonly<{ curentN: number; }>={curentN:1};

    public render(): React.ReactNode {
        return (
            <div className={this.props.className} style={this.props.style}>
                {
                    this.CurentPages().Dictionary.map(p=>{
                        return <PagePagination 
                            Value={p}
                            CurentSelected={this.state.curentN}
                            onSelect={(v)=>this.PageSelect(v)}
                            className={this.props.pageClass}
                            style={this.props.pageStyle}
                            onSelectedClass={this.props.pageOnSelectedClass}
                            onSelectedStyle={this.props.pageOnSelectedStyle}
                            key={p.Key}
                        />
                    })
                }
            </div>
        );
    }

    /**
     * Переводит данные переданные от родителя в страницы
     * @returns {Dictionary<number,T>} набор перелистываемых объектов
     */
    private Pages():Dictionary<number,T>{
        const res = new Dictionary<number,T>();
        if(this.props.Elements && this.props.Elements.length>1){
            let i=1;
            this.props.Elements.forEach(e=>{
                res.Add(i,e);
                i++;
            })
        }
        return res;
    }
    /**
     * Действие исполняемое при нажатии на страничку листания
     * @param {IKeyValuePair<number,T>} p данные страницы
     */
    private PageSelect(p:IKeyValuePair<number,T>):void{
        this.setState({curentN:p.Key},()=>{
            this.props.onSelect(p.Value);
        });
    }
    /**
     * Первая страница для перелистывания (для сохранения на экране отображения первой страницы)
     * @returns {IKeyValuePair<number,T>|undefined} данные страницы
     */
    private FirstPage():IKeyValuePair<number,T>|undefined{
        if(this.Pages().Count>1){
            return this.Pages().Dictionary[0];
        }else{
            return;
        }
    }
    /**
     * Последняя страница для перелистывания (для сохранения на экране отображения последней страницы)
     * @returns {IKeyValuePair<number,T>|undefined} данные страницы
     */
    private LasTPage():IKeyValuePair<number,T>|undefined{
        if(this.Pages().Count>this.props.MaxPages){
            const lpn =this.Pages().Count-1;
            return this.Pages().Dictionary[lpn];
        }else{
            return;
        }
    }
    /**
     * Формирует набор страниц для текущего отображения
     * @returns {Dictionary<number,T>} набор страниц для текущего отображения
     */
    private CurentPages():Dictionary<number,T>{
        if(this.Pages().Count>this.props.MaxPages+2){
            const hp=this.props.MaxPages/2;
            if(this.state.curentN>hp){
                const hpi=Math.trunc(hp);
                let s=this.state.curentN - hpi;                
                let end =s+this.props.MaxPages;
                if(end>=this.Pages().Count){
                    end=this.Pages().Count-1;
                    s=end-this.props.MaxPages;
                }
                const res = new Dictionary<number,T>();
                const fp = this.FirstPage();
                if(fp){res.Add(fp)}
                const curD=this.Pages().Dictionary;
                for(let i= s;i<end;i++){
                    res.Add(curD[i])
                }
                const lp =this.LasTPage();
                if(lp){
                    res.Add(lp);
                }  
                return res;
            }else{
                const count=this.props.MaxPages+1;
                const res = new Dictionary<number,T>();
                const curD=this.Pages().Dictionary;
                for(let i=0;i<count;i++){
                    res.Add(curD[i])
                }
                const lp =this.LasTPage();
                if(lp){
                    res.Add(lp);
                }                
                return res;
            }
        }else{
            return this.Pages();
        }
    }


}

export interface IPagePagination<T>{
    /**
     * Значение страницы
     */
    Value:IKeyValuePair<number,T>;
    /**
     * Номер текущей выбранной страницы
     */
    CurentSelected:number;
    /**
     * Действие при нажатии на страничку выполняемое внешним элементом
     */
     onSelect:(v:IKeyValuePair<number,T>)=>void;
    /**
     * Класс для элемента перечисления
     */
     className?:string;
     /**
      * Стиль элемента перечисления
      */
     style?:React.CSSProperties;
     /**
     * CSS Стиль текущей выбранной страницы
     */
    onSelectedStyle?:React.CSSProperties;
    /**
     * CSS Класс текущей выбранной страницы
     */
    onSelectedClass?:string;    
}


export class PagePagination<T> extends React.Component<IPagePagination<T>>{

    public render(): React.ReactNode {
        const kvp= this.props.Value;
        return (
            <div 
                onClick={()=>this.props.onSelect(kvp)}
                className={this.classNames()}
                style={this.curentStyle()}
            >
                {kvp.Key}
            </div>
        );
    }

    /**
     * Формирует классы для отображения
     * @returns {string|undefined} набор класов или (пусто)
     */
    private classNames():string|undefined{
        if(this.props.Value.Key===this.props.CurentSelected){
            let res= undefined;
            if(this.props.className){ res = this.props.className}
            if(this.props.onSelectedClass){
                if(res){
                    res+=" "+this.props.onSelectedClass;
                }else{res=this.props.onSelectedClass}
            }
            return res;
        }else{
            return this.props.className;
        }
    }

    /**
     * Формирует стили для отображения
     * @returns {React.CSSProperties|undefined} набор стилей или (пусто)
     */
    private curentStyle():React.CSSProperties|undefined{
        if(this.props.Value.Key===this.props.CurentSelected){
            return this.props.style;
        }else{
            return this.props.onSelectedStyle;
        }
    }
}

