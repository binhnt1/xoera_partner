import * as _ from 'lodash';
import { Injectable, EventEmitter } from '@angular/core';
import { ResultApi } from '../../mvc/domains/data/result.api';
import { DialogData } from '../../mvc/domains/data/dialog.data';
import { DialogType } from '../../mvc/domains/enums/diaglog.type';

@Injectable()
export class MvcDialogService {
    public EventDialog: EventEmitter<any> = new EventEmitter<any>();
    public EventHideDialog: EventEmitter<any> = new EventEmitter<any>();
    
    public Dialog(dialog: DialogData) {
        this.EventDialog.emit(dialog);
    }
   
    public Error(content: string, title: string = 'Error') {
        this.Alert(title, content);
    }
    public Success(content: string, title: string = 'Success') {
        this.Alert(title, content);
    }    
    public Warning(content: string, title: string = 'Warning') {
        this.Alert(title, content);
    }    
    public ErrorResult(result: ResultApi) {
        this.Alert("Error", result.Description);
    }
    public HideDialog(diaglog: DialogData) {
        this.EventHideDialog.emit(diaglog);
    }
    public Alert(title: string, content: string) {
        let dialog: DialogData = {
            title: title,
            content: content,
            okFunction: null,
            resultFunction: null,
            cancelFunction: null,
            type: DialogType.Dialog,
        };
        this.EventDialog.emit(dialog);
    }
    public Loading(title: string, content: string): DialogData {
        let dialog: DialogData = {
            title: title,
            content: content,
            okFunction: null,
            resultFunction: null,
            cancelFunction: null,
            type: DialogType.Loading,
        };
        this.EventDialog.emit(dialog);
        return dialog;
    }
    public Confirm(content: string, okFunction: () => void, cancelFunction: () => void = null, title = 'Confirm') {
        let dialog: DialogData = {
            title: title,
            content: content,
            cancelFunction: () => {
                if (cancelFunction) cancelFunction();
            },
            resultFunction: null,
            type: DialogType.Confirm,
            okFunction: () => {
                if (okFunction) okFunction();
            }
        }
        this.EventDialog.emit(dialog);
    }
    public Prompt(content: string, resultFunction: (result: any) => void, cancelFunction: () => void = null, title = 'Prompt') {
        let dialog: DialogData = {
            title: title,
            content: content,
            cancelFunction: () => {
                if (cancelFunction) cancelFunction();
            },
            resultFunction: (result: any) => {
                if (resultFunction) resultFunction(result);
            },
            type: DialogType.Prompt,
            okFunction: null,
        }
        this.EventDialog.emit(dialog);
    }  
}