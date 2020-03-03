export enum ThemeType {
    Metronic = 1,
    MetronicSass,
    MetronicIntranet,
}
export function ThemeTypeAware(constructor: Function) {
    constructor.prototype.ThemeType = ThemeType;
}
