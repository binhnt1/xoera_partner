import { DialogType } from "../enums/diaglog.type";

export class DialogData {
    object?: any;
    title: string;
    admin?: boolean;
    content?: string;
    type: DialogType;
    cancelFunction?: () => void;
    okFunction?: (result?: any) => void;
    resultFunction?: (result: any) => void;

    constructor() {        
    }
}