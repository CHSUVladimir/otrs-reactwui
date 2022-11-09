import AdversmentIdsStore from "./AdversmentIdsStore";


export default class AdversmentToDayIdsStore extends AdversmentIdsStore{
    
    /**
     * Загружает данные на неделю от текущего дня
     * @returns 
     */
    protected override async Load(): Promise<any> {
        return await this.LoadToDay();
    }
}