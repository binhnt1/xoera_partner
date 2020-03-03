export enum FleetType {
    AtravesarLimited = 1,
}
export function FleetTypeAware(constructor: Function) {
    constructor.prototype.FleetType = FleetType;
}