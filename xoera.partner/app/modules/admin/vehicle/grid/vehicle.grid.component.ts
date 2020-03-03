import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { VehicleEntity } from "../../../../domains/entities/vehicle.entity";

@Component({
  selector: 'app-vehicle-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class VehicleGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(VehicleEntity, router, data)
  }
}
