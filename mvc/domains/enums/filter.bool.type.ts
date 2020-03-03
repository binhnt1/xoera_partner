export enum FilterBoolType {
    Null = 1,
    True,
    False
}
export function FilterBoolTypeAware(constructor: Function) {
    constructor.prototype.FilterBoolType = FilterBoolType;
}
