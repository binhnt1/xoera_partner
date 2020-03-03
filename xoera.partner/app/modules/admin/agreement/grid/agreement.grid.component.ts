import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { AgreementEntity } from "../../../../domains/entities/agreement.entity";

@Component({
  selector: 'app-agreement-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class AgreementGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(AgreementEntity, router, data)
  }
}
