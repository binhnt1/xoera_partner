export enum DialogType {
    Vnc = 10,
    Agreement,
    EditTicket,
    AssignTicket,
    BookingHistory,
    EditTicketDetail,
}
export function DialogTypeAware(constructor: Function) {
    constructor.prototype.DialogType = DialogType;
}