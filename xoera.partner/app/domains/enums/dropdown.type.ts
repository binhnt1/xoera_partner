export enum DropDownType {
    Car = 1,
    String,
    LabelValue,
}
export function DropDownTypeAware(constructor: Function) {
    constructor.prototype.DropDownType = DropDownType;
}