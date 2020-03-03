import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { UserAgreementEntity } from "../../../../domains/entities/user.agreement.entity";

@Component({
  selector: 'app-user-agreement-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class UserAgreementEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(UserAgreementEntity, router, data, event);
  }
}
