import { OrderType } from "../enums/order.type";

export class Dictionary {
    public key: any;
    public value: any;
    public selected?: boolean;

    constructor(key: any, value: any) {
        this.key = key;
        this.value = value;
        this.selected = false;
    }
}

export class DictionarySorting {
    public key: any;
    public value: any;
    public selected?: boolean;
    public sorting?: OrderType;

    constructor(key: any, value: any) {
        this.key = key;
        this.value = value;
        this.selected = false;
    }
}