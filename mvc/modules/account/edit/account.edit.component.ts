import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { MvcDataService } from "../../../../mvc/services/data.service";
import { MvcEventService } from "../../../../mvc/services/event.service";
import { AccountEntity } from "../../../../mvc/domains/entities/account.entity";
import { EditBaseComponent } from "../../../components/edit/base/edit.base.component";

@Component({
  selector: 'app-account-edit',
  templateUrl: '../../../components/edit/base/edit.base.component.html',
})
export class AccountEditComponent extends EditBaseComponent {
  constructor(public data: MvcDataService, public event: MvcEventService, public router: Router) {
    super(AccountEntity, router, data, event);
  }
}
