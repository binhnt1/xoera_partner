export enum ActionType {
    Grid = 'grid',
    Edit = 'edit',
    AddNew = 'new',
}
export function ActionTypeAware(constructor: Function) {
    constructor.prototype.ActionType = ActionType;
}
