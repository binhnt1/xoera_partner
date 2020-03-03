export enum PatternType {
    Min = 'min', 
    Max = 'max',
    CardCvc = 'cvc',
    Exists = 'exists',
    CardNumber = 'card',
    Required = 'required',
    RequiredMatch = 'match'
}
export function PatternTypeAware(constructor: Function) {
    constructor.prototype.PatternType = PatternType;
}
