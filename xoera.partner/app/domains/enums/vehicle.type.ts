export enum VehicleType {
    Salon = 1,
    Executive,
    Vip,
    Estate,
    Mpv4,
    Mpv5,
    Mpv6,
    Mpv7,
    ExMpv,
    Seater,
    ExSeater,
    Coach
}
export function VehicleTypeAware(constructor: Function) {
    constructor.prototype.VehicleType = VehicleType;
}