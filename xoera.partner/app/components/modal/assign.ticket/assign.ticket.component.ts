import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicketEntity } from '../../../domains/entities/ticket.entity';
import { validation } from '../../../../../mvc/interceptor/validation';
import { MvcApiService } from '../../../../../mvc/services/api.service';
import { DialogData } from '../../../../../mvc/domains/data/dialog.data';
import { MvcDataService } from '../../../../../mvc/services/data.service';
import { MvcEventService } from '../../../../../mvc/services/event.service';
import { MvcDialogService } from '../../../../../mvc/services/dialog.service';
import { DialogTypeAware, DialogType } from '../../../domains/enums/dialog.type';

@DialogTypeAware
@Component({
    styleUrls: ['../modal.scss'],
    templateUrl: 'assign.ticket.component.html',
    selector: 'xoera-partner-modal-assign-ticket',
})

export class XoeraPartnerModalAssignTicketComponent implements OnInit, OnDestroy {
    dialog: DialogData;
    item: TicketEntity;
    visible: boolean = false;
    eventDialog: Subscription = null;

    constructor(
        public data: MvcDataService,
        public event: MvcEventService,
        public service: MvcApiService,
        public dialogService: MvcDialogService) {
        this.item = new TicketEntity();
    }

    ngOnInit() {
        if (this.eventDialog == null) {
            this.eventDialog = this.dialogService.EventDialog.subscribe((item: DialogData) => {
                if (item.type == <number>DialogType.AssignTicket) {
                    this.dialog = item;
                    this.visible = true;
                    this.item = item.object;
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
            if (this.dialog.cancelFunction) {
                this.dialog.cancelFunction();
            }
            this.item = null;
            this.dialog = null;
            this.visible = false;
        }
    }


    public async confirmModal() {
        if (this.dialog) {
            let valid = await validation(this.item, this.event, this.service, ['AssignToId', 'PriorityType']);
            if (valid) {
                if (this.dialog.okFunction) {
                    this.dialog.okFunction(this.item);
                }
                this.item = null;
                this.dialog = null;
                this.visible = false;
            }
        }
    }
}
