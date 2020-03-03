export enum PaymentType {
    Cash = 1,
    Card,
}
export function PaymentTypeAware(constructor: Function) {
    constructor.prototype.PaymentType = PaymentType;
}