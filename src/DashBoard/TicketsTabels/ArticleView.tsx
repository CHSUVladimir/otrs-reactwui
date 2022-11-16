import { IArticle, IArticleAttachment } from "@CHSUVladimir/otrs-connector";
import React from "react";
import styles from "../../Styles.module.scss";
import { Buffer } from 'buffer';

export interface IArticleView{
    Article:IArticle
}

export default class ArticleView extends React.Component<IArticleView>{

    private dRef = React.createRef<HTMLDivElement>();
    private shRoot=document.createElement('div');
    private shadow =this.shRoot.attachShadow({mode:'open'});
    public render(): React.ReactNode {
        return (
            <div className={styles.articleView}>
                <h3>{this.props.Article.Subject}</h3>
                <div ref={this.dRef} className={styles.article}></div>               
            </div>
        );
    }

    componentDidMount(): void {
        
        if(this.dRef.current){
            this.dRef.current.appendChild(this.shRoot);            
        }
        this.shadow.innerHTML=this.HTML();
    }

    componentDidUpdate(prevProps: Readonly<IArticleView>, prevState: Readonly<{}>, snapshot?: any): void {
        this.shadow.innerHTML=this.HTML();
    }

     /**
     * @property {string} HTML строка отображения элемента
     */
      private HTML():string{   
        var att = this.props.Article.Attachment as IArticleAttachment;                  
        if(att?.Content){            
            return Buffer.from(att.Content,'base64').toString();
        }else{             
            return "No BodY!";
        }       
        
    }

}