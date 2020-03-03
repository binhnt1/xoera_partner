export enum BookerType {
    Direct = 1,
    Android,
    Ios
}
export function BookerTypeAware(constructor: Function) {
    constructor.prototype.BookerType = BookerType;
}