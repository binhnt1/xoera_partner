export class Price {
    code: number;
    message: string;
    pricecat1: string;
    pricecat2: string;
    pricecat3: string;
    pricecat1item1des: string;
    pricecat1item2des: string;
    pricecat1item3des: string;
    pricecat1item4des: string;
    pricecat2item1des: string;
    pricecat2item2des: string;
    pricecat2item3des: string;
    pricecat2item4des: string;
    pricecat3item1des: string;
    pricecat3item2des: string;
    pricecat3item3des: string;
    pricecat3item4des: string;
    pricecat1item1price: string;
    pricecat1item2price: string;
    pricecat1item3price: string;
    pricecat1item4price: string;
    pricecat2item1price: string;
    pricecat2item2price: string;
    pricecat2item3price: string;
    pricecat2item4price: string;
    pricecat3item1price: string;
    pricecat3item2price: string;
    pricecat3item3price: string;
    pricecat3item4price: string;
}

export class PriceItem {
    Id: number;
    Name: string;
    Items: PriceItemDetail[];

    constructor(id: number, name: string) {
        this.Id = id;
        this.Name = name;
        this.Items = new Array();
    }

    public static ToItems(entity: Price): PriceItem[] {
        var items = new Array();
        let item1 = new PriceItem(1, entity.pricecat1);
        item1.Items.push(new PriceItemDetail(entity.pricecat1item1price, entity.pricecat1item1des));
        item1.Items.push(new PriceItemDetail(entity.pricecat1item2price, entity.pricecat1item2des));
        item1.Items.push(new PriceItemDetail(entity.pricecat1item3price, entity.pricecat1item3des));
        item1.Items.push(new PriceItemDetail(entity.pricecat1item4price, entity.pricecat1item4des));
        items.push(item1);

        let item2 = new PriceItem(2, entity.pricecat2);
        item2.Items.push(new PriceItemDetail(entity.pricecat2item1price, entity.pricecat2item1des));
        item2.Items.push(new PriceItemDetail(entity.pricecat2item2price, entity.pricecat2item2des));
        item2.Items.push(new PriceItemDetail(entity.pricecat2item3price, entity.pricecat2item3des));
        item2.Items.push(new PriceItemDetail(entity.pricecat2item4price, entity.pricecat2item4des));
        items.push(item2);

        let item3 = new PriceItem(3, entity.pricecat3);
        item3.Items.push(new PriceItemDetail(entity.pricecat3item1price, entity.pricecat3item1des));
        item3.Items.push(new PriceItemDetail(entity.pricecat3item2price, entity.pricecat3item2des));
        item3.Items.push(new PriceItemDetail(entity.pricecat3item3price, entity.pricecat3item3des));
        item3.Items.push(new PriceItemDetail(entity.pricecat3item4price, entity.pricecat3item4des));
        items.push(item3);

        return items;
    }
}

export class PriceItemDetail {
    Price: string;
    Description: string;
    constructor(
        price: string,
        description: string
    ) {
        this.Price = price;
        this.Description = description;
    }
}
