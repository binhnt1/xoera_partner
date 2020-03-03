import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { CompanyEntity } from "../../../../domains/entities/company.entity";

@Component({
  selector: 'app-company-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class CompanyGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(CompanyEntity, router, data)
  }
}
