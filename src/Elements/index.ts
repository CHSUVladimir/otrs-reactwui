export interface IDictionary<T,K>{
    Dictionary:IKeyValuePair<T,K>[];    
}

export interface IKeyValuePair<T,K>{
    Key:T;
    Value:K;
}

export class Dictionary<T,K> implements IDictionary<T,K>{
    /**
     * Основное хранилище
     */
    public Dictionary: IKeyValuePair<T, K>[]=[];

    /**
     * Добавляет пару ключ значение
     * @param {IKeyValuePair<T, K>} Key пара ключ значение
     */
    public Add(Key:IKeyValuePair<T, K>):void
    /**
     * Добавляет пару ключ значение
     * @param {T} Key ключ
     * @param {K} Value значение
     */
    public Add(Key:T, Value:K):void
    public Add(Key:T|IKeyValuePair<T, K>, Value?:K):void{
        if(Value){
            this.Dictionary.push({Key:Key as T, Value:Value});
        }else{
            const t = Key as IKeyValuePair<T, K>;
            if(t.Key){
                this.Dictionary.push(t);
            }else{
                throw new TypeError();
            }
            
        }
        
    }

    /**
     * @returns {T[]} набор ключей
     */
    public get Keys():T[]{
        return this.Dictionary.map(m=>m.Key);
    }

    /**
     * @returns {K[]} набор значений
     */
    public get Values():K[]{
        return this.Dictionary.map(m=>m.Value);
    }

    /**
     * Получает значение по ключу
     * @param {T} key ключ
     * @returns {K|undefined} значение, если существует
     */
    public GetValue(key:T):K|undefined{
        return this.Dictionary.find(m=>m.Key===key)?.Value;
    }

    /**
     * Удаляет по значению ключа пару ключ значение
     * @param {T} key ключ по которому будет удалена пара
     */
    public Remove(key:T):void{
        const mod=this.Dictionary.find(m=>m.Key===key);
        if(mod){
            const ind =this.Dictionary.indexOf(mod);
            if(ind>-1){
                this.Dictionary.splice(ind,1);
            }
        }        
    }

    /**
     * Удаляет, а затем добавляет значение
     * @param {T} Key ключ
     * @param {K} Value значение 
     */
    public Replace(Key:T, Value:K):void{
        this.Remove(Key);
        this.Add(Key,Value);
    }

    /**
     * Добавляет набор.
     * @param {IKeyValuePair<T,K>[]} Values набор пар значений ключ значений
     */
    public AddRange(Values:IKeyValuePair<T,K>[]):void{
        Values.forEach(m=>{
            this.Add(m.Key,m.Value);
        })
    }

    /**
     * Изменяет направление ключ значение на значение ключ
     * @returns {Dictionary<K,T>} измененый набор значение ключ
     */
    public Reverse():Dictionary<K,T>{
        const res = new Dictionary<K,T>();
        this.Dictionary.forEach(kvp=>{
            res.Add(kvp.Value, kvp.Key);
        })
        return res;
    }

    public get Count():number{
        return this.Dictionary.length;
    }

}