import AdversmentIdsStore from "./AdversmentIdsStore";

export default class AdversmentToWeekIdsStore extends AdversmentIdsStore{
    
    /**
     * Загружает данные на один день
     * @returns 
     */
    protected override async Load(): Promise<any> {
        return await this.LoadToWeek();
    }
}