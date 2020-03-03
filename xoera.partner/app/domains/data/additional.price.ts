export class AdditionalPrice {
    fare: number;
    vehtype: string;
    vehtypeid: number;
    totalfare: number;
    returnfare: number;
}

export class AdditionalPriceItem {
    Fare: number;
    VehType: string;
    VehTypeId: number;
    TotalFare: number;
    ReturnFare: number;

    public static ToItem(additionalPrice: AdditionalPrice): AdditionalPriceItem {
        if (additionalPrice == null) return new AdditionalPriceItem();
        let item = new AdditionalPriceItem();
        item.Fare = additionalPrice.fare;
        item.VehType = additionalPrice.vehtype;
        item.VehTypeId = additionalPrice.vehtypeid;
        item.TotalFare = additionalPrice.totalfare;
        item.ReturnFare = additionalPrice.returnfare;
        return item;
    }

    public static ToItems(entities: AdditionalPrice[]): AdditionalPriceItem[] {
        if (entities == null || entities.length == 0) return null;
        let items = new Array();
        entities.forEach(element => {
            items.push(AdditionalPriceItem.ToItem(element));
        });
        return items;
    }
}