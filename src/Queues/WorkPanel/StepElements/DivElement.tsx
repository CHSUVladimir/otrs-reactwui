import React from "react";
import { IDivToSafe, IPreviewElement, IQueue, ISafeElement, ISafPreviewElement, setUpElement } from "../..";

export interface IDivElement{
    Element:ISafeElement;
    Queue:IQueue;
}

export default class DivElement extends  React.Component<IDivElement> implements ISafPreviewElement{

    public Safe():IPreviewElement{
        this.setUPElement();
        if(this.mainRef.current){
            return {
                Element:this.mainRef.current,
                beNormal:this.maySafe
            };
        }else{
            throw new Error('element not finded!')
        }
    }

    private refsSPE:React.RefObject<ISafPreviewElement>[]=[];

    public render(): React.ReactNode {
        if(this.props.Element.Type==='div'){
            const el = this.props.Element.Parameters as IDivToSafe;
            return (
                <div style={el.Parameters.currentStyle} title={el.Parameters.TitleText}>
                    {
                        el.Elements.map((e,i)=>{
                            const ref=React.createRef<any>();
                            this.refsSPE.push(ref);
                            return setUpElement(e,this.props.Queue,i,ref);
                        })
                    }
                </div>
            );
        }else{
            <div>
                Не корректно переданный элемент с типом "{this.props.Element.Type}" ожидалось "div"
            </div>
        }
    }

    private mainRef=React.createRef<HTMLDivElement>();
    private maySafe=false;
    private setUPElement(){
        this.maySafe=true;
        const els:HTMLElement[]=[];
        this.refsSPE.forEach(r=>{
            if(this.maySafe){
                if(r.current){
                    const sve =r.current.Safe();
                    els.push(sve.Element)
                    this.maySafe=this.maySafe&&sve.beNormal;
                }else{
                    this.maySafe=false;
                }
            }
        });
        const el = this.props.Element.Parameters as IDivToSafe;
        const res = (<div style={el.Parameters.currentStyle} ref={this.mainRef} />);
        if(this.mainRef.current){
            const mrc=this.mainRef.current;
            els.forEach(e=>{
                mrc.appendChild(e);
            })
        }

        return res;

    }
}