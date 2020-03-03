import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { LicenceEntity } from "../../../../domains/entities/licence.entity";

@Component({
  selector: 'app-licence-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class LicenceGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(LicenceEntity, router, data)
  }
}
