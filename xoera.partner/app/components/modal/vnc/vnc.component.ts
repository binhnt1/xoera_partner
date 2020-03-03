import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceEntity } from '../../../domains/entities/device.entity';
import { DialogData } from '../../../../../mvc/domains/data/dialog.data';
import { MvcDialogService } from '../../../../../mvc/services/dialog.service';
import { DialogTypeAware, DialogType } from '../../../domains/enums/dialog.type';

@DialogTypeAware
@Component({
    templateUrl: 'vnc.component.html',
    selector: 'xoera-partner-modal-vnc',
    styleUrls: ['../modal.scss', './vnc.scss'],
})

export class XoeraPartnerModalVncComponent implements OnInit, OnDestroy {
    url: string;
    dialog: DialogData;
    item: DeviceEntity;
    loading: boolean = false;
    visible: boolean = false;
    eventDialog: Subscription = null;

    constructor(public dialogService: MvcDialogService) {
    }

    ngOnInit() {
        if (this.eventDialog == null) {
            this.eventDialog = this.dialogService.EventDialog.subscribe((item: DialogData) => {
                if (item.type == <number>DialogType.Vnc) {
                    this.dialog = item;
                    this.visible = true;
                    this.loading = true;
                    this.item = item.object;
                    this.url = 'vnc/vnc.html?'
                        + 'host=' + this.item.Ip
                        + '&port=' + this.item.Port
                        + '&password=' + this.item.Password;
                    $('html').addClass('noscroll');
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

    public loadComplete() {
        setTimeout(() => {
            this.loading = false
        }, 1000);
    }

    public closeModal() {
        if (this.dialog) {
            if (this.dialog.cancelFunction) {
                this.dialog.cancelFunction();
            }
            this.dialog = null;
            this.loading = false;
            this.visible = false;
            $('html').removeClass('noscroll');
        }
    }
}
