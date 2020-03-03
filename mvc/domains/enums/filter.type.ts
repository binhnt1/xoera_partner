export enum FilterType {
    And = 1,
    Or,
}
export function FilterTypeAware(constructor: Function) {
    constructor.prototype.FilterType = FilterType;
}
