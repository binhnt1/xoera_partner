export enum SearchAddressType {
    Local = 1,
    National,
    Google
}
export function SearchAddressTypeAware(constructor: Function) {
    constructor.prototype.SearchAddressType = SearchAddressType;
}