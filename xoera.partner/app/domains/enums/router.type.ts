export enum RouterType {
    Static = 1,
    TrafficAware,
}
export function RouterTypeAware(constructor: Function) {
    constructor.prototype.RouterType = RouterType;
}