export enum PositionType {
    Top = 1,
    Bottom,
}
export function PositionTypeAware(constructor: Function) {
    constructor.prototype.PositionType = PositionType;
}