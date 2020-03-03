import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { MvcDataService } from "../../../../mvc/services/data.service";
import { AccountEntity } from "../../../../mvc/domains/entities/account.entity";
import { GridBaseComponent } from "../../../components/grid/base/grid.base.component";

@Component({
  selector: 'app-account-edit',
  templateUrl: '../../../components/grid/base/grid.base.component.html',
})
export class AccountGridComponent extends GridBaseComponent {
  constructor(public data: MvcDataService, public router: Router) {
    super(AccountEntity, router, data);
  }
}