import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { MvcEventService } from "../../../../../../mvc/services/event.service";
import { EditBaseComponent } from "../../../../../../mvc/components/edit/base/edit.base.component";
import { AgreementEntity } from "../../../../domains/entities/agreement.entity";

@Component({
  selector: 'app-agreement-edit',
  templateUrl: '../../../../../../mvc/components/edit/base/edit.base.component.html',
})
export class AgreementEditComponent extends EditBaseComponent {
  constructor(public router: Router, public data: DataService, public event: MvcEventService) {
    super(AgreementEntity, router, data, event);
  }
}
