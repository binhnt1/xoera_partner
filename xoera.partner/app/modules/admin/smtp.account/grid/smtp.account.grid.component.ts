import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { GridBaseComponent } from "../../../../../../mvc/components/grid/base/grid.base.component";
import { SmtpAccountEntity } from "../../../../domains/entities/smtp.account.entity";

@Component({
  selector: 'app-smtp-account-grid',
  templateUrl: '../../../../../../mvc/components/grid/base/grid.base.component.html',
})
export class SmtpAccountGridComponent extends GridBaseComponent {
  constructor(public router: Router, public data: DataService) {
    super(SmtpAccountEntity, router, data)
  }
}
