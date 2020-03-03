export enum OrderType {
    Asc = 1,
    Desc
}
export function OrderTypeAware(constructor: Function) {
    constructor.prototype.OrderType = OrderType;
}
