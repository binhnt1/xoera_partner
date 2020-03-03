export enum DialogType {
    Dialog,
    Prompt,
    Confirm,
    Loading,
}
export function DialogTypeAware(constructor: Function) {
    constructor.prototype.DialogType = DialogType;
}