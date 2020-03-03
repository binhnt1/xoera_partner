import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { DeviceEntity } from "../../../../domains/entities/device.entity";

@Component({
  selector: 'app-device-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class DeviceEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(DeviceEntity, router, data, event);
  }
}
