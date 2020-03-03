export enum DriverType {
    Allocate = 1,
    Dispath,
}
export function DriverTypeAware(constructor: Function) {
    constructor.prototype.DriverType = DriverType;
}