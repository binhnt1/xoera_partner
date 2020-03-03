export enum TemplateEmailType {
    Register = 1,
    ChangePassword,
    ForgotPassword,
    RaiseTicket,
    AssignTicket,
    ReOpenTicket,
    CommentTicket
}
export function TemplateEmailTypeAware(constructor: Function) {
    constructor.prototype.TemplateEmailType = TemplateEmailType;
}
