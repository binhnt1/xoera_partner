import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { validation } from '../../../../../mvc/interceptor/validation';
import { DialogData } from '../../../../../mvc/domains/data/dialog.data';
import { MvcDataService } from '../../../../../mvc/services/data.service';
import { MvcEventService } from '../../../../../mvc/services/event.service';
import { MvcDialogService } from '../../../../../mvc/services/dialog.service';
import { UserAgreementDto } from '../../../domains/objects/user.agreement.dto';
import { DialogTypeAware, DialogType } from '../../../domains/enums/dialog.type';

@DialogTypeAware
@Component({
    styleUrls: ['../modal.scss'],
    templateUrl: 'agreement.component.html',
    selector: 'xoera-partner-modal-agreement',
})

export class XoeraPartnerModalAgreementComponent implements OnInit, OnDestroy {
    dialog: DialogData;
    item: UserAgreementDto;
    visible: boolean = false;
    eventDialog: Subscription = null;

    constructor(
        public data: MvcDataService,
        public event: MvcEventService,
        public dialogService: MvcDialogService) {
        this.item = new UserAgreementDto();
    }

    ngOnInit() {
        if (this.eventDialog == null) {
            this.eventDialog = this.dialogService.EventDialog.subscribe((item: DialogData) => {
                if (item.type == <number>DialogType.Agreement) {
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
        }
    }

    public closeModal() {
        if (this.dialog) {
            if (this.dialog.cancelFunction)
                this.dialog.cancelFunction();
            this.dialog = null;
            this.visible = false;
        }
    }

    public async confirmModal() {
        if (this.dialog) {
            let valid = await validation(this.item, this.event);
            if (valid) {
                if (this.dialog.okFunction)
                    this.dialog.okFunction();
                this.dialog = null;
                this.visible = false;
            }
        }
    }
}
