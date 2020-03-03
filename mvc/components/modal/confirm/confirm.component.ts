import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogData } from '../../../domains/data/dialog.data';
import { MvcDialogService } from '../../../services/dialog.service';
import { DialogType, DialogTypeAware } from '../../../domains/enums/diaglog.type';

@DialogTypeAware
@Component({
    styleUrls: ['../modal.scss'],
    selector: 'mvc-modal-confirm',
    templateUrl: 'confirm.component.html',
})

export class ModalConfirmComponent implements OnInit, OnDestroy {
    eventDialog: Subscription = null;
    visible: boolean = false;
    dialog: DialogData;

    constructor(public dialogService: MvcDialogService) {}

    ngOnInit() {
        if (this.eventDialog == null) {
            this.eventDialog = this.dialogService.EventDialog.subscribe((item: DialogData) => {
                if (item.type == DialogType.Confirm) {
                    this.dialog = item;
                    this.visible = true;
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.eventDialog != null) {
            this.eventDialog.unsubscribe();
            this.eventDialog = null;
            this.visible = false;
        }
    }
    
    public closeModal() {
        if (this.dialog) {
            this.visible = false;
            if (this.dialog.cancelFunction) 
                this.dialog.cancelFunction();
        }
    }

    public confirmModal() {
        if (this.dialog) {
            this.visible = false;
            if (this.dialog.okFunction) 
                this.dialog.okFunction();
        }
    }
}
