import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { UserAgreementEntity } from "../../../../domains/entities/user.agreement.entity";

@Component({
  selector: 'app-user-agreement-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class UserAgreementGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(UserAgreementEntity, router, data)
  }
}
