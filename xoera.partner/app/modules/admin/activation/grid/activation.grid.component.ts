import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { ActivationEntity } from "../../../../domains/entities/activation.entity";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";

@Component({
  selector: 'app-activation-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class ActivationGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(ActivationEntity, router, data)
  }
}
