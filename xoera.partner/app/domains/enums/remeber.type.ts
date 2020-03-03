export enum RememberType {
    Normal = 1,
    Swap,
}
export function RememberTypeAware(constructor: Function) {
    constructor.prototype.RememberType = RememberType;
}