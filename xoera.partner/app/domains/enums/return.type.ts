export enum ReturnType {
    Signle = 1,
    Return,
}
export function ReturnTypeAware(constructor: Function) {
    constructor.prototype.ReturnType = ReturnType;
}