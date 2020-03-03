import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { SmtpAccountEntity } from "../../../../domains/entities/smtp.account.entity";

@Component({
  selector: 'app-smtp-account-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class SmtpAccountEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(SmtpAccountEntity, router, data, event);
  }
}
