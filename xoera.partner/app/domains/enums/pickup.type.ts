export enum PickType {
    Now = 1,
    Later
}
export function PickTypeAware(constructor: Function) {
    constructor.prototype.PickType = PickType;
}