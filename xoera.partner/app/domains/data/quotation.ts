export class Quotation {
    price: number;
    distance: number;
    priceType: string;
    requestId: string;
    travelTime: number;
    routePath: number[][];
    returnRoutePath?: number[][];
}
