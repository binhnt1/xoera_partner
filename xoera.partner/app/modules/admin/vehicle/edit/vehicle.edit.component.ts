import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { VehicleEntity } from "../../../../domains/entities/vehicle.entity";

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class VehicleEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(VehicleEntity, router, data, event);
  }
}
