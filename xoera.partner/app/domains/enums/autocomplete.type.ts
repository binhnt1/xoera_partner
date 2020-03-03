export enum AutocompleteType {
    Pickup = 1,
    Dropoff,
    ViaAddress
}
export function AutocompleteTypeAware(constructor: Function) {
    constructor.prototype.AutocompleteType = AutocompleteType;
}