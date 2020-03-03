import * as _ from "lodash";
import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { DialogType } from "../../../../domains/enums/dialog.type";
import { AppConfig } from "../../../../../../mvc/helpers/app.config";
import { DeviceEntity } from "../../../../domains/entities/device.entity";
import { ResultApi } from "../../../../../../mvc/domains/data/result.api";
import { RouterHelper } from "../../../../../../mvc/helpers/router.helper";
import { ResultType } from "../../../../../../mvc/domains/enums/result.type";
import { MvcDialogService } from "../../../../../../mvc/services/dialog.service";

@Component({
    selector: 'app-device-grid',
    styleUrls: ['./device.grid.scss'],
    templateUrl: 'device.grid.component.html',
})
export class DeviceGridComponent {
    loading: boolean;
    items: DeviceEntity[];

    constructor(
        public router: Router,
        public service: ApiService,
        public dialog: MvcDialogService) {
    }

    ngOnInit() {
        this.loading = true;
        this.items = [];
        this.service.selectAll('Device', null, null, null, 1, 1000)
            .then((result: ResultApi) => {
                if (result.Type == ResultType.Success) {
                    this.items = <DeviceEntity[]>result.Object;
                }
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
    }

    connect(item: DeviceEntity) {
        this.dialog.Dialog({
            object: _.cloneDeep(item),
            type: <number>DialogType.Vnc,
            title: 'Connect to ' + item.Name
        });
    }

    navigate(item: DeviceEntity) {
        RouterHelper.NavigateToEditPage(this.router, item.Id);
    }
}
